<template>
  <v-container class="home-bg">
    <v-layout justify-center>
      <v-flex
      xs12 sm6 md6 lg6>
          <div class="display-3 mx-auto pa-4">Terms Of Service</div>
          <div v-html="termsOfService"></div>
      </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { terms } from '@/assets/TOS.js'

export default {
  name: 'Terms',
  data() {
      return {
        termsOfService: terms,
      };
    },
}
</script>

<style>

</style>
