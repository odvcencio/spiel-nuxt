<template>
  <div id="app">
    <v-app>
      <NavBar class="" style="z-index:1;" />
      <component class="" :is="layout">
        <router-view/>
      </component>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'
import { mapGetters } from 'vuex'

const default_layout = "default";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    },
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
  },
  components: {
    NavBar,
    Footer
  },
  created: function ()
  {
    this.$store.dispatch('category/fetchCategories')
    this.$store.dispatch('user/checkLoggedInUser').then(() => {
      this.$store.dispatch('user/getAccountDetails')
    })
  },
}
</script>

<style>
</style>
