<template>
  <div>
    <div v-if="!token" class="mainSection columns is-centered">
      <div class="column is-4 home-bg">
        <Welcome/>
      </div>
    </div>
    <div v-if="hasIncompleteProfile && isLoaded">
      <Account isFounder/>
    </div>
    <div v-if="questions.length > 0 && !hasIncompleteProfile" class="columns is-centered pt-3">
      <div class="column is-6 pt-5">
        <QuestionList v-on:notReadyYet="getFounderQuestions" :questions="questions"/>
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
    if (store.state.user.accessToken && process.server) {
      await store.dispatch('user/getAccountDetails')
    }
  },
  async asyncData ({ store, app }) {
    const uri = `https://dev.tryspiel.com/api/v1/founderQuestions`
    const token = store.state.user.accessToken

    if (token) {
      let config = {
        headers: {
          Authorization: token
        }
      }
      try {
        let { data } = await app.$axios.get(uri, config)
        console.log(data.data.founderQuestions)
        return { questions: data.data.founderQuestions }
      } catch(e) {
        console.log(e.response)
      }
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
      isLoaded:          false,
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
  watch: {
    isLoggedIn (loggedIn) {
      if (!loggedIn) {
        this.questions = []
      } else {
        this.getFounderQuestions()
      }
    }
  },
  methods: {
    updateFounder() {
      user.updateAccount(
        async () => {
          await this.$store.dispatch('user/getAccountDetails');
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
  mounted: function() {
    this.isLoaded = true;
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
