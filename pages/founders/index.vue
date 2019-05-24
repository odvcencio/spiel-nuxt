<template>
  <div class="pt-5">
    <div v-if="isLoggedIn">
      <div v-if="showAccount">
        <Account isFounder/>
      </div>
      <div v-else class="columns is-centered pt-3">
        <div class="column is-6">
          <QuestionList v-on:notReadyYet="getFounderQuestions" :questions="questions"/>
        </div>
      </div>
    </div>
    <div v-else class="mainSection columns is-centered">
      <div class="column is-4 home-bg">
        <Welcome/>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account/Account'
import Welcome from '@/components/founders/Welcome'
import QuestionList from '@/components/founders/QuestionList'
import user from '@/api/user'
import questions from '@/api/questions'
import { mapGetters, mapState } from 'vuex'

export default {
  async fetch ({ store, params }) {
    await store.dispatch('user/checkLoggedInUser')
  },
  async asyncData (context) {
    const uri = `https://dev.tryspiel.com/api/v1/founderQuestions`

    let config = {
      headers: {
        Authorization: context.store.state.user.accessToken
      }
    }
    try {
      let { data } = await context.app.$axios.get(uri, config)
      return { questions: data.data.founderQuestions }
    } catch(e) {
      //console.log(context.store.state.user.accessToken)
      console.log(e)
      //console.log(context.store.state.user.accessToken)
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      getLoadStatus: 'user/getLoadStatus',
      hasIncompleteProfile: 'user/hasIncompleteProfile'
    }),
    ...mapState({
      token:    state => state.user.accessToken,
      founder:  state => state.user.founder,
      industry: state => state.user.industry
    }),
    showAccount: function () {
      return this.founderIncomplete;
    }
  },
  data() {
    return {
      isLoaded:          Boolean,
      founderIncomplete: Boolean,
      founderUpdate:     { founder: true },
      questions:         []
    };
  },
  components: {
    Account,
    Welcome,
    QuestionList
  },
  methods: {
    updateFounder() {
      user.updateAccount(
        () => {
          this.$store.dispatch('user/getAccountDetails');
          this.isLoaded = true;
        },
        this.founderUpdate,
        this.token
      )
    },
    getFounderQuestions() {
      questions.getFounderQuestions(
        (questions) => {
          this.questions = questions;
        },
        this.token
      )
    }
  },
  watch: {
    getLoadStatus (newStatus) {
      if (newStatus == 2) {
        this.isLoaded = true;
      }
    },
    hasIncompleteProfile(newStatus) {
      if (!newStatus) {
        this.founderIncomplete = false;
        this.getFounderQuestions();
      }
    }
  },
  mounted: function() {
    if (this.isLoggedIn && !this.founder) {
      this.updateFounder();
    }

    if (!this.hasIncompleteProfile && this.token) {
      this.founderIncomplete = false;
      this.getFounderQuestions();
    }
  }
}
</script>

<style lang="scss">
.mainSection {
  margin-top: 35px;
  padding:5px;
}
.subheading {
  padding:5px;
}
</style>
