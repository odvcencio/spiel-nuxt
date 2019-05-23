<template>
  <v-container class="home-bg mt-4 mx-auto" align-content-center justify-center>
    <v-layout row justify-center>
      <v-flex
      xs12 sm6 md6 lg6 xl6>
        <v-layout column justify-center>
          <div class="display-3 mx-auto">Privacy Policy</div>
          <div v-html="privacyPolicy"></div>
        </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import { privacyPolicy } from '@/assets/PrivacyPolicy.js'

export default {
  name: 'PrivacyPolicy',
  data() {
      return {
        privacyPolicy: privacyPolicy,
      };
    },
}
</script>

<style>

</style>
