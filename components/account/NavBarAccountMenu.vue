<template>
    <b-dropdown hoverable aria-role="list">
      <button class="button is-yellow is-medium" slot="trigger">
        <v-avatar
            size="35"
            color="grey lighten-4"
            slot="trigger"
            >
            <v-img :src="this.profilePicture" alt="avatar"> </v-img>
        </v-avatar>
      </button>
        <b-dropdown-item class="has-text-centered" has-link aria-role="listitem">
          <div class="has-text-centered">
            <nuxt-link to="/account">
              My Profile
            </nuxt-link>
          </div>

        </b-dropdown-item>
        <b-dropdown-item has-link aria-role="listitem">
          <a @click="logout">
            Log Out
          </a>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AccountMenu',
  computed: {
    ...mapState({
      profilePicture: state => state.user.profilePicture
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/signOut').then(
        () => {
          this.$store.commit('reset');
        }
    )
    }
  },
}
</script>

<style>
  .dropdown-menu {
    width: 120px;
    height: 80px;
    position: relative;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    display: flex;
  }
  .dropdown-menu:before {
    content: "";
    position: absolute;
    padding-top: 20%;
    bottom: 90%;
    left: 20%;
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-bottom: 13px solid white;
    border-right: 13px solid transparent;
  }

  .dropdown-content {
    justify-content: center;
    align-content: center;
    width: 100px;
  }
</style>
