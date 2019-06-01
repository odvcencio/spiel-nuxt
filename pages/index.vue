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
            Founders to connect with and help one another.
          </span>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-6-desktop has-text-centered grey-box">
          <span class="is-size-5">
            Free Forever
          </span>
          </br></br>
          <button class="button is-blue brand-buttons has-text-weight-semibold" @click="openSignup">
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
      <div class="columns py-4">
        <div class="column has-text-centered">
          <span class="is-size-4 has-text-weight-semibold">
            Top Spotlights of the week
          </span>
          <div class="py-3">
            <div class="spotlights mx-2" v-for="spotlight in spotlights" :key="spotlight.id" @click="spotlightClicked(spotlight.id)">
              <img class="spotlight-photo" :src="spotlight.thumbnail_url" />
              </br>
              <span class="is-size-5 has-text-weight-bold">
                {{ spotlight.spieler.first_name }} {{ spotlight.spieler.last_name }}
              </span>
              </br>
              <span class="is-size-6 has-text-gray has-text-weight-light">
                {{ spotlight.spieler.title }} at {{ spotlight.spieler.company }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <span>
            Ready to sign up?
          </span>
          </br>
          <button class="button is-yellow brand-buttons has-text-white has-text-weight-semibold" @click="openSignup">
            TAP ME
          </button>
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
import SignupLogin from '~/components/core/SignupLogin.vue'

export default {
  async asyncData (context) {
    let uri = 'https://dev.tryspiel.com/api/v1/spotlights'
    let { data } = await context.$axios.get(uri)

    return { spotlights: data.data.spiels }
  },
  data() {
    return {
      spotlights: [],
    }
  },
  methods: {
    spotlightClicked(id) {
      const routeData = this.$router.resolve({
        path: `/spiel/${id}`,
      })
      window.open(routeData.href, '_blank')
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
  }
}
</script>

<style>
.spotlights {
  display: inline-block;
  cursor: pointer;
}
.spotlight-photo {
  max-width:  256px;
}

.brand-buttons {
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
