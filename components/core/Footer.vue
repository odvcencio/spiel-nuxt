<template>
  <v-footer
    height="auto"
    class="footer-bg"
  >
    <v-layout
      justify-center
      column
      wrap>
      <nuxt-link to="/">
        <img class="footer-img" src="../../static/logo.png">
      </nuxt-link>
      <v-layout
        wrap
        justify-center
        row>
        <v-flex>
          <nuxt-link to="terms-of-service" class="pa-2">
            Terms Of Service
          </nuxt-link>
          <nuxt-link to="privacy-policy" class="pa-2">
            Privacy Policy
          </nuxt-link>
          <nuxt-link to="about-us" class="pa-2">
            About Us
          </nuxt-link>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
.footer-img {
  padding: 10px;
}
.footer-links {
  text-align: center;
}
.footer-bg {
  background-color: rgb(234, 234, 234) !important;
  text-align: center;
  padding-bottom: 10px;
}
</style>
