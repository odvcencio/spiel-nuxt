<template>
  <div class="">
    <div v-if="!questionSelected">
      <div class="columns is-centered pt-5">
        <div class="column is-4-desktop is-6-tablet is-10-mobile mx-auto">
          <div v-if="showCompleteProfileLink" class="has-text-centered pb-2">
            Please Complete Your <a @click="sendToAccount">Profile</a>
          </div>
          <a @click="clickedOnQuestion">
            <div
              class="home-bg mb-4 py-4 pl-2 has-text-left has-text-weight-light has-text-grey"
            >
              What's your question?
            </div>
          </a>
          <div
            class="pt-1 has-text-left has-text-grey-light has-text-weight-semibold"
          >
            Latest Questions
          </div>
          <CategoriesDisplay @selected-categories="fetchQuestionsForCategory"/>
          <div>
            <div class="home-bg">
              <hr class="divider-categories" />
            </div>
            <QuestionCards
              :questions="questions"
              @selected-question="setSelectedQuestionID"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-else>
      <div class="columns is-centered pt-5">
        <div class="column is-4-desktop is-6-tablet is-10-mobile mx-auto has-text-centered">
          <a class="back-to-questions" @click="backToQuestions">
            <span>Back To Questions</span>
          </a>
          <QuestionDetail :questionID="selectedQuestionID" class="mt-4"/>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import SignupLogin from '@/components/core/SignupLogin.vue'
import QuestionCards from '@/components/questions/QuestionCards.vue'
import QuestionDetail from '@/components/questions/QuestionDetail.vue'
import CategoriesDisplay from '@/components/categories/CategoriesDisplay.vue'
import AskQuestion from '@/components/questions/AskQuestion.vue'
import { mapGetters, mapState } from 'vuex'
import { toast } from 'bulma-toast'

export default {
  async fetch ({ store, params }) {
    await store.dispatch('category/fetchCategories')
  },
  async asyncData (context) {
    let uri = 'https://dev.tryspiel.com/api/v1/questionsByCategory?'
    let { data } = await context.$axios.get(uri)

    return { questions: data.data.questions }
  },
  name: 'Home',
  components: {
    QuestionCards,
    QuestionDetail,
    CategoriesDisplay
  },
  data() {
    return {
      questionsLoaded:         false,
      oneCategorySelected:     false,
      categories:              [],
      questions:               [],
      selectedCategories:      [],
      questionSelected:        false,
      selectedQuestionID:      0,
      showCompleteProfileLink: false,
      askQuestionComponent:    AskQuestion
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn:           'user/isLoggedIn',
      hasIncompleteProfile: 'user/hasIncompleteProfile',
      getLoadStatus:        'user/getLoadStatus'
    }),
    ...mapState({
      token: state => state.user.accessToken
    })
  },
  watch: {
    getLoadStatus(newStatus) {
      if (newStatus == 2 && this.hasIncompleteProfile) {
        this.showCompleteProfileLink = true
      } else {
        this.showCompleteProfileLink = false
      }
    }
  },
  created: function() {
    this.fetchQuestionsForCategory()
  },
  mounted: function() {
    if (this.getLoadStatus == 2 && this.hasIncompleteProfile) {
      this.showCompleteProfileLink = true
    }

    this.fetchQuestionsForCategory()
  },
  methods: {
    backToQuestions() {
      this.questionSelected = false
      this.fetchQuestionsForCategory()
    },
    setSelectedQuestionID(id) {
      this.selectedQuestionID = id
      this.questionSelected = true
    },
    errorToast() {
      if (process.client) {
        toast({
          message: 'Please complete your profile.',
          type: 'is-blue',
          dismissible: true,
          position: 'top-center'
        })
      }
    },
    sendToAccount() {
      this.$router.push('/account')
    },
    fetchQuestionsForCategory(selectCategories) {
      let uri = 'https://dev.tryspiel.com/api/v1/questionsByCategory?'
      if (selectCategories) {
        const queryParams = []
        for (const id of selectCategories) {
          queryParams.push('id=' + id)
        }
        const joined = queryParams.join(`&`)
        uri = uri + joined
      }

      this.$axios.get(uri).then(response => {
        this.questionsLoaded = true
        this.questions       = response.data.data.questions
      })
    },
    clickedOnQuestion() {
      if (this.isLoggedIn) {
        if (this.hasIncompleteProfile) {
          this.errorToast()
          return
        }
        this.openQuestion()
      } else {
        this.openLogin()
      }
    },
    openQuestion() {
      this.$modal.open({
        parent: this,
        component: AskQuestion,
        hasModalCard: true,
        events: {
          'question-sent': () => {
            this.fetchQuestionsForCategory()
          }
        }
      })
    },
    openLogin() {
      this.$modal.open({
        parent: this,
        component: SignupLogin,
        hasModalCard: true,
        props: {
          signUpLogin: 'login'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.back-to-questions {
  padding-bottom: 20px;
  padding-top: 20px;
}

.feed {
  background-color: rgb(216, 216, 216);
  position: relative;
  width: 110px;
  height: 21px;
  left: 25%;
  top: 10px;
}

.is-horizontal-center {
  justify-content: center;
}

.scroll-menu {
  overflow: auto;
  white-space: nowrap;
}

.home-bg {
  background-color: white;
}

.modal-close {
  right: 0px;
  left: 20px;
  max-width: 64px !important;
  max-height: 64px !important;
  height: 64px !important;
  width: 64px !important;
}

.divider-categories {
  margin: 0.4em 0;
  display: block;
}
</style>
