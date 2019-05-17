import spiels from '../api/spiels'

// initial state
export const state = () => ({
  blob: {},
})

// getters
const getters = {

}

// actions
export const actions = {
  checkLoggedInUser ({ commit }) {
    user.checkAuth(
      user => { commit('setAuth', user) }
    )
  },

}

// mutations
export const mutations = {
  setAuth (state, user) {
    state.password = '';
  },
}
