import categories from '../api/categories'

// initial state
export const state = () => ({
  categories: [],
})

// getters
export const getters = {

}

// actions
export const actions = {
  async fetchCategories ({ commit }) {
    let uri = `https://dev.tryspiel.com/api/v1/categories`
    const { data } = await this.$axios.get(uri)
    commit('setCategories', data.data.categories)
  },
}

// mutations
export const mutations = {
  setCategories (state, categories) {
    state.categories = categories;
  },
}
