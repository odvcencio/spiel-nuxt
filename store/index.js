import Cookies from 'universal-cookie';
import user from '../api/user'
import { Auth } from 'aws-amplify';

export const actions = {
  async getAccountDetailsFromServer ({ commit, dispatch, state }, token) {
    let uri = 'https://dev.tryspiel.com/api/v1/account'
    const config = {
      headers: {
        'Authorization': token
      }
    }
    try {
      const { data } = await this.$axios.get(uri, config)
      commit('user/setAccount', data.data.user)
    } catch (e) {
      if (e.response &&
        e.response.data.error_message === 'Token is expired') {
        const cookies = new Cookies();
        cookies.remove('auth')
      }
    }
  }
}
