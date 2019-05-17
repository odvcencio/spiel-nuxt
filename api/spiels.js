import axios from 'axios'

export default {
  getSpielByID(cb, cbError, id) {
    const uri = `https://dev.tryspiel.com/api/v1/spiels/${id}`
    axios
      .get(uri)
      .then(response => {
        cb(response.data.data.spiel)
      })
      .catch(function(error) {
        console.log(error.response.status)
        if (error.response.status) {
          cbError(error)
        }
      })
  },
  getSpielsFromUserByID(cb, id) {
    const uri = `https://dev.tryspiel.com/api/v1/spielsFromUser?id=${id}`
    axios
      .get(uri)
      .then(response => {
        cb(response.data.data.spiels)
      })
      .catch(function(error) {
        console.log(error.response)
      })
  },
  getUploadURL(cb, accessToken, duration) {
    const uri = `https://dev.tryspiel.com/api/v1/getUploadURL`
    axios
      .get(uri, {
        headers: {
          Authorization: accessToken,
          'X-From-Web': accessToken,
          Duration: duration
        }
      })
      .then(response => {
        cb(response.data.data.upload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  uploadSpielToLink(url, videoBlob) {
    const data = new FormData()
    data.append('file', videoBlob)
    const config = {
      headers: {
        'Content-Type': `multipart/form-data;`
      }
    }

    axios
      .put(url, data, config)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertSpiel(cb, accessToken, spielInfo) {
    const uri = `https://dev.tryspiel.com/api/v1/spiel`
    axios
      .post(uri, spielInfo, { headers: { Authorization: accessToken } })
      .then(response => {
        cb()
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  insertInterview(cb, accessToken, founderSpiel) {
    const uri = `https://dev.tryspiel.com/api/v1/founderInterview`
    axios
      .post(uri, founderSpiel, { headers: { Authorization: accessToken } })
      .then(response => {
        cb()
      })
      .catch(function(error) {
        console.log(error.response)
      })
  }
}
