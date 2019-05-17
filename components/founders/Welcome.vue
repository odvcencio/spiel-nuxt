<template>
  <div>
    <br/>
      <div class='display-2 font-weight-light mb-3'>
        Founder Interview
      </div>
    <br/>
      <div class='subheading'>
        Answering these questions will help the community learn about your startup and the team behind it.
        Our goal is to assist you in connecting with your audience.
      </br></br>
        Thank you for participating in the Founders Interview.
      </div>
      <div class='subheading'>
        <b>Let’s Rock N Roll!</b>
      </div>
      <!-- <div class='subheading'>
        Join a community of startup founders
      </div> -->
    <div class="my-buttons">
      <button class="button is-blue is-outlined is-normal mr-2"
            @click="this.openLogin">
            Login
      </button>
      <button class="button is-blue is-normal"
            @click="this.openSignup">
            Signup
      </button>
    </div>
  </div>
</template>

<script>
import SignupLogin from '@/components/core/SignupLogin.vue'

export default {
  name: 'Welcome',
  methods: {
    openSignup() {
      this.$modal.open({
        parent: this,
        component: SignupLogin,
        hasModalCard: true,
        props: {
          isSignup: true
        }
      })
    },
    openLogin() {
      this.$modal.open({
        parent: this,
        component: SignupLogin,
        hasModalCard: true,
        props: {
          isSignup: false
        }
      })
    },
  },
}
</script>

<style>
/* this css class does nothing */
.my-buttons {
  margin-top: 20px;
}
</style>
