<template>
  <section class="hero founder-container">
    <div class="hero-body home-bg">
      <div class="columns">
        <div class="column has-text-centered">
          <span class="is-size-1 has-text-weight-bold">
            A Founder Community
          </span>
          </br>
          <span class="is-size-5 has-text-weight-light">
            A digital Q&A community for </br>
            Founders to connect and help one another.
          </span>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-6-desktop has-text-centered grey-box">
          <span class="is-size-5">
            Free Forever
          </span>
          </br></br>
          <button class="button is-blue get-started">
            GET STARTED
          </button>
          </br></br>
          <span class="is-size-7 has-text-weight-light has-text-gray">
            Join a community of everyday creators & professionals
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <span>
            Connect with Creators
          </span>
          </br>
          <span>
            Within Spiel we provide everyday creators like </br>
            you the tools to faciliate meaningful interactions.
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <span>
            Top Spotlights of the week
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <span>
            Ready to sign up?
          </span>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <span>
            Read our Terms of Service & Privacy Policy, and if you have any </br>
            questions please don't hesitate to Contact Us.
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.get-started {
  width: 300px;
  height: 50px;
}
.grey-box {
  background: rgb(234, 234, 234) !important;
}

.founder-container {
  margin: 0 auto;
  display: flex;
  width: 100%;
  background: #fff !important;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
