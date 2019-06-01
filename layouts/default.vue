<template>
  <div class="app">
    <v-app class="app-layout">
      <NavBar />
        <Nuxt/>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import NavBar from '@/components/core/NavBar.vue'
import Footer from '@/components/core/Footer.vue'
import { mapGetters, mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

const default_layout = "default";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    },
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    ...mapState({
      token: state => state.user.accessToken
    })
  },
  components: {
    NavBar,
    Footer
  },
  async mounted() {
    let key = process.env.localStorageKey + process.env.cognitoClientID + '.'
    let lastAuthUser = window.localStorage.getItem(key + 'LastAuthUser')

    if (lastAuthUser !== null) {
      let tokenKey = key + lastAuthUser + '.accessToken'
      let token = window.localStorage.getItem(tokenKey)

      this.$store.commit('user/setAuth', token)
      Cookie.set('auth', token)

      const getUser = this.$store.dispatch('user/getAccountDetails')
      await getUser
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
// Set your colors
$primary: #135bb0;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);
$spiel-blue: #135bb0;
$spiel-blue-invert: findColorInvert($spiel-blue);
$spiel-yellow: #f0b835;
$spiel-yellow-invert: findColorInvert($spiel-yellow);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert),
  "blue": ($spiel-blue, $spiel-blue-invert),
  "yellow": ($spiel-yellow, $spiel-yellow-invert)
);

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
@import '~bulma-divider';

.app-layout {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgb(234, 234, 234) !important;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.app {
  height: 100vh;
  width: 100vw;
}

@font-face {
  font-family: "San Francisco Display Ultralight";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/SF-Compact-Display-Ultralight.otf") format("otf")
}

@font-face {
  font-family: "San Francisco Display Thin";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/SF-Compact-Display-Thin.otf") format("otf")
}

@font-face {
  font-family: "San Francisco Display Regular";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/SF-Compact-Display-Regular.otf") format("otf")
}

@font-face {
  font-family: "San Francisco Display Semibold";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/SF-Compact-Display-Semibold.otf") format("otf")
}

@font-face {
  font-family: "San Francisco Display Medium";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/SF-Compact-Display-Medium.otf") format("otf")
}

@font-face {
  font-family: "San Francisco Display Bold";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/SF-Compact-Display-Bold.otf") format("otf")
}
</style>
