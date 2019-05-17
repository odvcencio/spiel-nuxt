import axios from 'axios'

export default {
  async getCategories (cb) {
    let uri = `https://dev.tryspiel.com/api/v1/categories`

    return await axios.get(uri)
  }
}
