<template>
  <div class="pt-4">
    <div v-if="isFounder">
      <div class="has-text-centered column pb-4">
        Please Complete Your Profile Before Proceeding
      </div>
    </div>
    <div class="columns is-centered mt-4">
      <div class="column is-10-mobile is-6-tablet mx-auto is-4-desktop home-bg">
        <EditAccount
          v-bind:emptySubmit="emptySubmit"
          v-bind:isFounder="shouldAddFounderFields"
          v-on:account-updated="updateAccount"/>
      </div>
    </div>
    <div class="columns is-centered pt-4">
      <div class="column is-10-mobile is-6-tablet mx-auto is-4-desktop">
        <b-field
         label="Categories"
         :type="noCategoriesSelectedType"
         :message="noCategoriesSelectedMessage">
          <AccountCategories
            v-on:selected-categories="updateSelectedCategories"/>
        </b-field>
      </div>
    </div>
    <div class="column is-mobile">
      <div class="column is-10-mobile is-6-tablet mx-auto is-4-desktop pt-0 mt-0">
        <button v-if="!isFounder" @click="submitClicked" class="button is-medium is-blue is-pulled right">
          UPDATE
        </button>
        <button v-else @click="submitClicked" class="button is-medium is-blue is-pulled right">
          NEXT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import EditAccount from '@/components/account/EditAccount'
import AccountCategories from '@/components/categories/AccountCategories'
import user from '@/api/user'
import { toast } from "bulma-toast";

export default {
  async fetch ({ store, params }) {
    await store.dispatch('user/getAccountDetails')
  },
  props: {
    isFounder: {
      type: Boolean
    }
  },
  data() {
    return {
      accountUpdate:           {},
      updatedCategories:       [],
      loaded:                  false,
      updateAccountSuccess:    false,
      updateCategoriesSuccess: false,
      shouldAddFounderFields:  false,
      updateClicked:           false,
      emptySubmit:             false,
    };
  },
  computed: {
    ...mapGetters({
      userCategoryIDs: 'user/categoryIDs',
      isLoggedIn:      'user/isLoggedIn',
      getLoadStatus:   'user/getLoadStatus',
    }),
    ...mapState({
      token:   state => state.user.accessToken,
      founder: state => state.user.founder
    }),
    noCategoriesSelectedType: function () {
      if (this.emptySubmit) {
        return this.userCategoryIDs.length == 0 ? 'is-danger' : ''
      }
    },
    noCategoriesSelectedMessage: function () {
      if (this.emptySubmit) {
        return this.userCategoryIDs.length == 0 ? 'At least one category selection is required' : ''
      }
    }
  },
  components: {
    EditAccount,
    AccountCategories
  },
  watch: {
    isLoggedIn (newStatus) {
      if (!newStatus) {
        this.$router.push('home')
      } else {
        this.shouldAddFounderFields = this.founder;
      }
    },
    getLoadStatus (newStatus) {
      if (newStatus == 2) {
        this.shouldAddFounderFields = this.isFounder || this.founder;
        this.loaded                 = true;
      } else {
        this.loaded                 = false;
      }
    },
    updateClicked (newStatus) {
      if (newStatus) {
        this.emptySubmit = true;
      }
    }
  },
  methods: {
    update() {
      if (this.accountUpdate.pictureButtonClicked) {
        delete this.accountUpdate.pictureButtonClicked;
      }

      if (Object.keys(this.accountUpdate).length !== 0) {
        user.updateAccount(
          () => {
            this.updateAccountSuccess = true;
            this.successToast();
            if (this.updateClicked) {
              this.$store.dispatch('user/getAccountDetails').
                then(() => {
                  this.emptySubmit = true;
                });
            }
          },
          this.accountUpdate,
          this.token
        )
      }

      if (this.updatedCategories.length > 0) {
        user.updateCategories(
          () => {
            this.updateCategoriesSuccess = true;
            this.successToast();
            if (this.updateClicked) {
              this.$store.dispatch('user/getAccountDetails').
              then(() => {
                this.emptySubmit   = true;
              });
            }
          },
          { categories: this.updatedCategories },
          this.token
        )
      }


    },
    successToast() {
      if (this.updateAccountSuccess) {
        this.updateAccountSuccess = false;
        this.accountUpdate = {};

        toast({
          message: "Account successfully updated",
          type: "is-success",
          dismissible: true,
          position: "top-center"
        });
        this.emptySubmit = true;
      }

      if (this.updateCategoriesSuccess) {
        this.updateCategoriesSuccess = false;

        toast({
          message: "Categories successfully updated",
          type: "is-success",
          dismissible: true,
          position: "top-center"
        });
        this.emptySubmit = true;
      }
    },
    arraysEqual(arr1, arr2) {
      if(arr1.length !== arr2.length)
        return false;
      for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
          return false;
      }
      return true;
    },
    updateSelectedCategories(categories) {
      let unique             = [...new Set(categories)];
      this.updatedCategories = unique;
    },
    updateAccount(update) {
      this.accountUpdate = update;
      if (update.pictureButtonClicked) {
        this.update();
      }
    },
    submitClicked() {
      this.updateClicked = true;
      this.emptySubmit   = true;
      this.update();
    }
  },
}
</script>

<style>
.fa-exclamation-circle::before {
  display: none;
}
</style>
