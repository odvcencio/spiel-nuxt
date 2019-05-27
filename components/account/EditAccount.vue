<template>
  <section>
    <b-field
     :label="this.firstNameLabel"
     :type="this.checkRequired(this.newFirstName)"
     :message="this.messageForError(this.newFirstName, this.firstNameLabel)">
      <b-input
       v-model.trim="newFirstName"
       type="text"
       @input="changeFirstName">
      </b-input>
    </b-field>
    <b-field
     :label="this.lastNameLabel"
     :type="this.checkRequired(this.newLastName)"
     :message="this.messageForError(this.newLastName, this.lastNameLabel)">
      <b-input
       v-model.trim="newLastName"
       type="text"
       @input="changeLastName">
      </b-input>
    </b-field>
    <b-field
     :label="this.selfieLabel"
     :type="this.checkRequired(this.newPictureURL)"
     :message="this.messageForError(this.newPictureURL, this.selfieLabel)">
        <v-avatar
            size="77"
            color="grey lighten-4"
            class="mt-2"
            >
            <v-img :src="this.newPictureURL" alt="avatar"> </v-img>
        </v-avatar>
      </b-field>
      <div class="columns">
        <div class="column is-3 has-text-centered">
          <button class="button is-blue" @click="takeNewPhoto">
            Take a Selfie
          </button>
        </div>
        <div class="is-divider-vertical" data-content="OR"></div>
        <div class="column is-2 has-text-centered">
          <b-upload v-model="uploadedPhoto">
            <a class="button is-blue">
              Upload
            </a>
          </b-upload>
        </div>
    </div>
    <b-field
     :label="this.titleLabel"
     :type="this.checkRequired(this.newTitle)"
     :message="this.messageForError(this.newTitle, this.titleLabel)">
      <b-input
       v-model.trim="newTitle"
       type="text"
       @input="changeTitle">
      </b-input>
    </b-field>
    <b-field
     :label="this.companyLabel"
     :type="this.checkRequired(this.newCompany)"
     :message="this.messageForError(this.newCompany, this.companyLabel)">
      <b-input
       v-model.trim="newCompany"
       type="text"
       @input="changeCompany">
      </b-input>
    </b-field>
    <b-field
     :label="this.aboutMeLabel"
     :type="this.checkRequired(this.newAboutMe)"
     :message="this.messageForError(this.newAboutMe, this.aboutMeLabel)">
      <b-input
       v-model.trim="newAboutMe"
       type="textarea"
       @input="changeAboutMe">
      </b-input>
    </b-field>
    <b-field
     :label="this.usernameLabel"
     :type="this.checkRequired(this.newUsername)"
     :message="this.messageForError(this.newUsername, this.usernameLabel)">
      <b-input
      v-model.trim="newUsername"
      type="text"
      @input="changeUsername">
      </b-input>
    </b-field>
    <div v-if="isFounderCheck">
      <b-field
       :label="this.industryLabel"
       :type="this.checkRequired(this.newIndustry)"
       :message="this.messageForError(this.newIndustry, this.industryLabel)">
        <b-input
         v-model.trim="newIndustry"
         type="text"
         @input="changeIndustry">
        </b-input>
      </b-field>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProfilePhotoTaker from './ProfilePhotoTaker'
import user from '@/api/user';

export default {
  name: 'EditAccount',
  props: {
    isFounder: {
      type: Boolean
    },
    emptySubmit: {
      type: Boolean
    }
  },
  methods: {
    updateObject() {
      this.$emit('account-updated', this.update)
    },
    takeNewPhoto() {
      this.update.pictureButtonClicked = true;
      this.updateObject();

      this.$modal.open({
        parent: this,
        component: ProfilePhotoTaker,
        hasModalCard: true,
        events: {
          'pic-uploaded': (photo) => {
            this.$store.dispatch('user/getAccountDetails');
            this.$router.go()
          }
        }
      })
    },
    changeFirstName(newFirst) {
      if (newFirst == '' && this.account.firstName != '') {
        delete this.update.first_name;
      } else if (newFirst !== this.account.firstName) {
        this.update.first_name = newFirst;
      } else {
        delete this.update.first_name;
      }

      this.updateObject();
    },
    changeLastName(newLast) {
      if (newLast == '' && this.account.lastName != '') {
        delete this.update.last_name;
      } else if (newLast !== this.account.lastName) {
        this.update.last_name = newLast;
      } else {
        delete this.update.last_name;
      }
      this.updateObject()
    },
    changeTitle(newTitle) {
      if (newTitle == '' && this.account.title != '') {
        delete this.update.title;
      } else if (newTitle !== this.account.title) {
        this.update.title = newTitle;
      } else {
        delete this.update.title;
      }
      this.updateObject()
    },
    changeCompany(newCompany) {
      if (newCompany == '' && this.account.company != '') {
        delete this.update.company;
      } else if (newCompany !== this.account.company) {
        this.update.company = newCompany;
      } else {
        delete this.update.company;
      }
      this.updateObject()
    },
    changeUsername(newUsername) {
      if (newUsername == '' && this.account.username != '') {
        delete this.update.username;
      } else if (newUsername !== this.account.username) {
        this.update.username = newUsername;
      } else {
        delete this.update.username;
      }
      this.updateObject()
    },
    changeAboutMe(newAboutMe) {
      if (newAboutMe == '' && this.account.aboutMe != '') {
        delete this.update.about_me;
      } else if (newAboutMe !== this.account.aboutMe) {
        this.update.about_me = newAboutMe;
      } else {
        delete this.update.about_me;
      }
      this.updateObject()
    },
    changeIndustry(newIndustry) {
      if (newIndustry == '' && this.account.industry != '') {
        delete this.update.industry;
      } else if (newIndustry !== this.account.industry) {
        this.update.industry = newIndustry;
      } else {
        delete this.update.industry;
      }
      this.updateObject()
    },
    setAccountInfo() {
      this.newFirstName  = this.account.firstName
      this.newLastName   = this.account.lastName
      this.newTitle      = this.account.title
      this.newCompany    = this.account.company
      this.newUsername   = this.account.username
      this.newAboutMe    = this.account.aboutMe
      this.newPictureURL = this.account.profilePicture
      if (this.account.founder) {
        this.isFounderCheck = true
      }
      this.newIndustry   = this.account.industry
    },
    uploadPhoto() {
      if (this.uploadedPhoto != null) {
        var formData = new FormData();
        formData.append('photo', this.uploadedPhoto, 'newProfilePic');

        user.updateProfilePhoto(
          () => {
            this.updateObject()
            this.$router.go();
          },
          formData,
          this.token
        )
      }
    },
    checkRequired(input) {
      if (this.getLoadStatus == 2 && this.showError) {
        return input != '' ? '' : 'is-danger'
      } else {
        return ''
      }
    },
    messageForError(input, label) {
      if (this.getLoadStatus == 2 && this.showError) {
        return input != '' ? '' : label + ' is required'
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      update:         {},
      firstNameLabel: 'First Name',
      lastNameLabel:  'Last Name',
      selfieLabel:    'Selfie',
      titleLabel:     'Title',
      companyLabel:   'Company',
      aboutMeLabel:   'About Me',
      industryLabel:  'Industry',
      usernameLabel:  'Username',
      newFirstName:   '',
      newLastName:    '',
      newTitle:       '',
      newCompany:     '',
      newUsername:    '',
      newAboutMe:     '',
      newPictureURL:  '',
      newIndustry:    '',
      isFounderCheck: this.isFounder,
      uploadedPhoto:  null,
      showError:      false
    };
  },
  computed: {
    ...mapGetters({
      account:       'user/account',
      isLoggedIn:    'user/isLoggedIn',
      getLoadStatus: 'user/getLoadStatus',
      getNewPhoto:   'user/getNewPhoto'
    }),
    ...mapState({
      token:   state => state.user.accessToken
    }),
  },
  watch: {
    getLoadStatus (newStatus) {
      if (newStatus == 2) {
        this.setAccountInfo();
      }
    },
    getNewPhoto(newPhoto) {
      this.newPictureURL = newPhoto;
    },
    uploadedPhoto(newPhoto) {
      this.uploadPhoto();
    },
    emptySubmit(newValue) {
      this.showError = newValue;
    }
  },
  mounted: function() {
    this.setAccountInfo();
  }
}
</script>

<style>
</style>
