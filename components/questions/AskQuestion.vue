<template>
  <div
    class="modal-card mx-auto home-bg"
    style="max-width:380px; background-color:rgb(241,241,241);"
  >
    <div class="modal-card-body px-2 home-bg">
      <div class="columns pb-0 mb-0 is-mobile">
        <div class="column is-1">
          <v-avatar size="30" color="grey lighten-4">
            <v-img :src="this.profilePicture" alt="avatar"> </v-img>
          </v-avatar>
        </div>
        <div
          class="column ml-2 has-text-weight-light has-text-grey is-pulled-left"
        >
          {{ this.firstName + ' ' + this.lastName }}
        </div>
      </div>

      <textarea
        v-model="question"
        style="border:none"
        class="textarea"
        placeholder="What's your question?"
        rows="2"
      ></textarea>

      <CategoriesDisplay
        ask-question
        @selected-categories="setCategoryID"
      ></CategoriesDisplay>

      <div class="pa-2">
        <img class="smallSpiel" src="../../assets/circle-Spiel.png" />
        <span class="ml-2">Helpful tip:</span>
        <p>
          In order to receive the best spiels possible, please provide the
          community with as much information as possible.
        </p>
      </div>
    </div>
    <footer class="modal-card-foot pa-3" style="justify-content:flex-end;">
      <button class="button is-blue" @click="shareQuestion">
        SHARE
      </button>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategoriesDisplay from '../categories/CategoriesDisplay'
import questions from '../../api/questions'

export default {
  name: 'AskQuestion',
  data() {
    return {
      question: '',
      categoryID: 0,
      questionSent: false
    }
  },
  methods: {
    shareQuestion() {
      if (this.question != '' && this.categoryID != 0) {
        questions.insertQuestion(
          () => {
            this.$emit('question-sent')
            this.question = ''
            this.categoryID = 0
            this.questionSent = true
            this.$parent.close()
          },
          { question: this.question, category_id: this.categoryID },
          this.token
        )
      }
    },
    setCategoryID(id) {
      this.categoryID = id[0]
    }
  },
  computed: {
    ...mapState({
      profilePicture: state => state.user.profilePicture,
      firstName: state => state.user.firstName,
      lastName: state => state.user.lastName,
      token: state => state.user.accessToken
    })
  },
  components: {
    CategoriesDisplay
  }
}
</script>

<style>
.smallSpiel {
  height: 16px;
  width: 16px;
  transform: translateY(15%);
}
</style>
