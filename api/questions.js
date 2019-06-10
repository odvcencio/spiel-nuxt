import axios from 'axios'

export default {
  getQuestionByID(cb, id) {
    const uri = `https://dev.tryspiel.com/api/v1/questions/${id}`
    axios
      .get(uri)
      .then(response => {
        cb(response.data.data.question)
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  insertQuestion(cb, question, token) {
    const uri = `https://dev.tryspiel.com/api/v1/question`
    axios
      .post(uri, question, { headers: { Authorization: token } })
      .then(response => {
        console.log(response.data)
        cb()
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  getFounderQuestions(cb, token) {
    const uri = `https://dev.tryspiel.com/api/v1/founderQuestions`
    axios.get(uri, { headers: { Authorization: token } })
      .then(response => {
        cb(response.data.data.founderQuestions)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}
