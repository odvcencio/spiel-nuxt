import user from '../api/user'

// initial state
export const state = () => ({
  firstName:         '',
  lastName:          '',
  title:             '',
  company:           '',
  profilePicture:    '',
  aboutMe:           '',
  username:          '',
  accessToken:       '',
  email:             '',
  needsConfirm:      false,
  industry:          '',
  founder:           false,
  password:          '',
  categories:        [],
  accountLoadStatus: 0,
  userError:         {}
})

// getters
export const getters = {
  isLoggedIn: state => {
    return state.accessToken != ''
  },
  hasIncompleteProfile: state => {
    var incompleteFirstName      = state.firstName      == '';
    var incompleteLastName       = state.lastName       == '';
    var incompleteTitle          = state.title          == '';
    var incompleteProfilePicture = state.profilePicture == '';
    var incompleteAboutMe        = state.aboutMe        == '';
    var incompleteUsername       = state.username       == '';

    var loggedIn = state.accessToken != ''

    if (state.founder) {
      var incompleteIndustry = state.industry == '';

      let incompleteFounder = incompleteUsername       ||
                              incompleteFirstName      ||
                              incompleteLastName       ||
                              incompleteTitle          ||
                              incompleteProfilePicture ||
                              incompleteAboutMe        ||
                              incompleteIndustry;

      return incompleteFounder && loggedIn
    }

    let incomplete = incompleteUsername       ||
                     incompleteFirstName      ||
                     incompleteLastName       ||
                     incompleteTitle          ||
                     incompleteProfilePicture ||
                     incompleteAboutMe;


    return incomplete && loggedIn
  },
  account: state => {
    return {
      firstName:      state.firstName,
      lastName:       state.lastName,
      title:          state.title,
      profilePicture: state.profilePicture,
      company:        state.company,
      aboutMe:        state.aboutMe,
      username:       state.username,
      categories:     state.categories,
      founder:        state.founder,
      industry:       state.industry
    }
  },
  categoryIDs: state => {
    return state.categories.map(categoryObject => {
      return categoryObject.id
    });
  },
  getLoadStatus: state => {
    return state.accountLoadStatus
  },
  getNewPhoto: state => {
    return state.profilePicture
  }
}

// actions
export const actions = {
  async getAccountDetails ({ commit, dispatch, state }) {
    let uri = 'https://dev.tryspiel.com/api/v1/account'
    var token = state.accessToken

    if (state.accessToken) {
      const config = {
        headers: {
          'Authorization': token
        }
      }

      try {
        const { data } = await this.$axios.get(uri, config)
        commit('setAccount', data.data.user)
      } catch (e) {
        if (e.response.status === 401 ||
            e.response.data.error_message === 'Token is expired') {
          try {
            if (process.client) {
              await dispatch('checkLoggedInUser')
            }
          } catch(e) {
            return
          }
        }
      }
    }
  },
  async checkLoggedInUser ({ commit }) {
    return new Promise((resolve, reject) => {
      user.checkAuth(
        token => {
          commit('setAuth', token);
          resolve(token)
        }
      )
    })
  },
  login ({ commit }, creds) {
    return new Promise((resolve, reject) => {
      user.login(
        creds,
        token => {
          commit('setAuth', token)
          resolve()
        },
        error => {
          commit('setUserError', error)
          reject(error)
        }
      )
    })
  },
  signOut ({ commit }) {
    return new Promise((resolve, reject) => {
      user.signOut(
        () => {
          commit('signOut')
          resolve()
        }
      )
    });
  },
  signUp ({ commit }, creds) {
    user.signUp(
      creds,
      () => {
        commit('setConfirmTrue', creds);
      }
    )
  },
  confirmCode({ commit }, code) {
    user.confirmCode(
      code,
      () => { commit('setConfirmFalse') }
    )
  },
  userNeedsConfirm ({ commit }, creds) {
    commit('setConfirmTrue', creds);
  }
}

// mutations
export const mutations = {
  setAccount (state, account) {
    if (account.first_name) {
      state.firstName      = account.first_name
    }
    if (account.last_name) {
      state.lastName       = account.last_name
    }
    if (account.title) {
      state.title          = account.title
    }
    if (account.company) {
      state.company        = account.company
    }
    if (account.profile_photo_url) {
      state.profilePicture = account.profile_photo_url
    }
    if (account.about_me) {
      state.aboutMe        = account.about_me
    }
    if (account.username) {
      state.username       = account.username
    }
    if (account.industry) {
      state.industry       = account.industry
    }
    if (account.founder) {
      state.founder        = account.founder
    }
    if (account.user_categories) {
      state.categories     = account.user_categories
    }
  },
  setAuth (state, token) {
    state.password    = '';
    state.email       = '';
    state.accessToken = token;
  },
  signOut (state) {
    state.firstName         = '';
    state.lastName          = '';
    state.title             = '';
    state.company           = '';
    state.profilePicture    = '';
    state.aboutMe           = '';
    state.username          = '';
    state.accessToken       = '';
    state.email             = '';
    state.needsConfirm      = false;
    state.industry          = '';
    state.founder           = false;
    state.password          = '';
    state.categories        = [];
    state.accountLoadStatus = 0;
    state.userError         = {};
  },
  setConfirmFalse (state) {
    state.needsConfirm = false;
  },
  setConfirmTrue (state, creds) {
    state.needsConfirm = true;
    state.email        = creds.email;
    state.password     = creds.password;
  },
  setAccountLoadStatus(state, status){
    state.accountLoadStatus = status;
  },
  setUserError(state, error){
    state.userError = error;
  }
}
