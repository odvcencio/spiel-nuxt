<template>
  <div>
      <div class="column is-7-desktop">
        <v-toolbar
          color="rgb(240, 184, 53)"
          height="55px"
          flat
          dense
          app
          >
          <v-toolbar-title>
            <a><img class="mt-2 mx-3" src="../../static/logo.png"></a>
          </v-toolbar-title>
          <div class="mx-4 is-hidden-touch">
            <nuxt-link to="/home">
              <span v-bind:class="{
                'has-text-blue has-text-weight-semibold': isHome,
                'has-text-white': !isHome
                }">
                Home
              </span>
            </nuxt-link>
          </div>
          <b-dropdown v-show="showItems" hoverable aria-role="list">
            <button class="button is-yellow is-medium mx-2" slot="trigger">
                <span class="icon has-text-white my-auto">
                  <b-icon pack="fas" icon="ellipsis-h"></b-icon>
                </span>
            </button>
              <b-dropdown-item class="is-hidden-desktop" has-link aria-role="listitem">
                <nuxt-link to="/home">
                  Home
                </nuxt-link>
              </b-dropdown-item>
                <b-dropdown-item has-link aria-role="listitem">
                  <nuxt-link to="/about-us">
                    About Us
                  </nuxt-link>
                </b-dropdown-item>
          </b-dropdown>
          <v-spacer>
          </v-spacer>
          <v-toolbar-items>
            <div v-if="!isLoggedIn" class="my-auto">
              <button class="button is-white is-outlined is-normal mr-2"
                    @click="this.openLogin" @keyup.enter="enterWasPressed">
                    Login
              </button>
              <button class="button is-blue is-normal"
                    @click="this.openSignup">
                    Signup
              </button>
            </div>
            <div v-show="showItems" v-else class="my-auto">
              <AccountMenu/>
            </div>
          </v-toolbar-items>
        </v-toolbar>
      </div>
  </div>
</template>

<script>
import SignupLogin from './SignupLogin.vue'
import AccountMenu from '../account/NavBarAccountMenu.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    ...mapState({
      needsConfirm: state => state.user.needsConfirm
    }),
    isHome () {
      return this.$route.path === '/home'
    }
  },
  data() {
    return {
      confirmCode:  '',
      modalOpen:    false,
      enterPressed: false,
      showItems:    false
    };
  },
  methods: {
    enterWasPressed() {
      this.enterPressed = true;
    },
    openSignup() {
      this.$modal.open({
        parent: this,
        component: SignupLogin,
        hasModalCard: true,
        props: {
          isSignup:     true,
          enterPressed: this.enterPressed
        },
        onCancel: () => {
          this.modalOpen = false;
        }
      })
    },
    openLogin() {
      this.$modal.open({
        parent: this,
        component: SignupLogin,
        hasModalCard: true,
        props: {
          isSignup:     false,
          enterPressed: this.enterPressed
        },
        onCancel: () => {
          this.modalOpen = false;
        }
      })
    },
  },
  components: {
    AccountMenu
  },
  mounted: function() {
    this.showItems = true;
  }
}
</script>

<style lang="scss">
.navbar-spacer {
  background-color: rgb(240, 184, 53);
}

.noHover {
  .v-btn:hover:before {
      background-color: transparent;
    }
}

.a:hover:before {
  background-color: transparent;
}

.navbar {
  z-index: 1;
}

.v-toolbar {
  z-index: 1;
}
</style>
