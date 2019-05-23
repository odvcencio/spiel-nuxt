export const state = () => ({

})

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    // global.document = {};
    // global.document.cookie = req.headers.cookie;
    console.log(req.headers)
    // We need to wait until attributes updated, because once page
    // is rendered - changes to store from the server won't affect
    // client side store
    //dispatch('user/checkLoggedInUser');
  },
}
