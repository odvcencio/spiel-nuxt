<template>
  <div>
    <div class="columns is-centered pt-5">
      <div class="column is-4-desktop is-6-tablet is-10-mobile mx-auto has-text-centered">
        <a class="back-to-questions" @click="backToQuestions">
          <span>Back To Questions</span>
        </a>
        <div v-show="loaded">
          <QuestionDetail
           :question="this.question"
           :asker="this.asker"
           :spiels="this.spiels"
           class="mt-4"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionDetail from '@/components/questions/QuestionDetail.vue'

export default {
  asyncData (context) {
    let uri = `https://dev.tryspiel.com/api/v1/questions/${context.params.id}`
    return context.$axios.get(uri)
      .then((res) => {
        return {
          question: res.data.data.question,
          asker:    res.data.data.question.asker,
          spiels:   res.data.data.question.spiels,
          loaded:   true
        }
      })
  },
  name: 'question',
  components: {
    QuestionDetail
  },
  data () {
    return {
      question: {},
      asker:    {},
      spiels:   [],
      loaded:   false
    }
  },
  methods: {
    backToQuestions() {
      this.$router.go(-1);
    }
  },
  mounted: function () {
    this.questionID = this.$route.params.id;
  },
}
</script>

<style>
</style>
