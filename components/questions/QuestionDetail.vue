<template>
  <div v-if="loaded" class="home-bg">
    <div class="columns is-mobile">
      <div class="column is-6 is-narrow">
        <div class="column is-3 is-pulled-left">
          <v-avatar size="65" color="grey lighten-4" class="mx-1">
            <v-img
              class="click"
              :src="this.asker.profile_photo_url"
              alt="avatar"
              @click="openUserProfileTab(asker.username)"
            >
            </v-img>
          </v-avatar>
        </div>
        <div class="nameAndTitle">
          <div
            class="click has-text-weight-bold tight-line-height is-size-5"
            @click="openUserProfileTab(asker.username)"
          >
            {{ this.asker.first_name + ' ' + this.asker.last_name }}
            <br />
          </div>
          <div class="has-text-weight-light is-size-6">
            {{ this.asker.title }}
            <span v-if="asker.company">at {{ asker.company }}</span>
          </div>
          <br />
        </div>
      </div>
      <div class="spielIndicator">
        <div v-if="this.spiels && !this.question.founder">
          <div class="tight-line-height is-size-5 has-text-weight-semibold">
            {{ this.spiels.length }}
          </div>
          <div class="has-text-grey-light">
            <div v-if="spiels.length > 1">
              Spiels
            </div>
            <div v-else>
              Spiel
            </div>
          </div>
        </div>
        <div v-else-if="this.spiels && !this.question.founder">
          <b>0</b>
          <div>
            Spiels
          </div>
        </div>
      </div>
      <div
        v-if="this.question.founder"
        class="mt-3 has-text-blue founderInterview"
      >
        Founder Interview
      </div>
    </div>
    <div class="columns mx-auto">
      <div class="column">
        <div class="has-text-left is-size-5">
          {{ this.question.question }}
        </div>
      </div>
    </div>
    <div>
      <hr class="divider-card" />
    </div>
    <div v-if="!question.founder">
      <a class="back-to-questions" @click="isAnswerQuestion">
        <span>Answer Question</span>
      </a>
      <div>
        <hr class="divider-card" />
      </div>
    </div>
    <div v-if="question.answered">
      <ListOfSpiels :spiels="spiels" />
    </div>
    <div v-else>
      Be the First To Answer This
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import questions from '../../api/questions'
import ListOfSpiels from '../spiels/ListOfSpiels.vue'
import SpielRecorder from '../spiels/SpielRecorder.vue'
import SignupLogin from '../core/SignupLogin.vue'

export default {
  name: 'QuestionDetail',
  data() {
    return {
      question: {},
      asker: {},
      spiels: [],
      loaded: false,
      answerQuestion: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    })
  },
  components: {
    ListOfSpiels,
    SpielRecorder,
    SignupLogin
  },
  props: {
    questionID: {
      type: Number
    }
  },
  mounted: function() {
    this.getQuestionByID(this.$route.params.id)
  },
  methods: {
    getQuestionByID(id) {
      if (id != 0) {
        questions.getQuestionByID(question => {
          this.question = question
          this.asker = question.asker
          this.spiels = question.spiels
          this.loaded = true
        }, id)
      }
    },
    isAnswerQuestion() {
      if (this.isLoggedIn && !this.question.founder) {
        this.answerQuestion = true

        this.$modal.open({
          parent: this,
          component: SpielRecorder,
          hasModalCard: true,
          props: {
            questionID: this.questionID
          }
        })
      } else {
        this.$modal.open({
          parent: this,
          component: SignupLogin,
          hasModalCard: true,
          props: {
            signUpLogin: 'login'
          }
        })
      }
    },
    openUserProfileTab(username) {
      const routeData = this.$router.resolve({
        path: `/profile/${username}`
      })
      window.open(routeData.href, '_blank')
    },
    returnToQuestions() {
      this.answerQuestion = false
    }
  }
}
</script>

<style>
.founderInterview {
  width: 50px;
  height: 50px;
  margin-right: 7%;
}
.click {
  cursor: pointer;
}
</style>
