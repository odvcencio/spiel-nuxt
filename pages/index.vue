<template>
  <div class="pt-4 columns">
    <div class="column is-7 mx-auto">
      <div class="founder-container px-5">
        <div class="columns py-5">
          <div class="column has-text-centered home-bg">
            <span class="is-size-1 has-text-weight-bold">
              Learn from Founders
            </span>
            </br>
            <div class="is-size-5 has-text-weight-light">
              A community for Founders to connect<br/>
              and help one another through questions,
              video advice, and stories.
            </div>
          </div>
        </div>
        <div class="columns is-centered pt-3 pb-5">
          <div class="column is-6 has-text-centered grey-box">
            <div class="is-size-5 py-3">
              Free Forever
            </div>
            <div class="column is-12 mx-auto">
              <button class="is-fullwidth button is-blue get-started has-text-weight-semibold" @click="getStarted">
                GET STARTED
              </button>
            </div>
            <div class="py-3 is-size-6 has-text-weight-light has-text-gray">
              Join a community of everyday creators & professionals
            </div>
          </div>
        </div>
      </div>


      <div class="creator">
        <div class="columns is-vcentered">
          <div class="column has-text-centered has-text-white">
            <div class="is-size-2 has-text-weight-bold">
              Connect with Creators
            </div>
            <div class="is-size-5">
              Within Spiel we provide everyday creators like </br>
              you the tools to faciliate meaningful interactions.
            </div>
          </div>
        </div>
      </div>

      <div class="spotlight-container pa-5">
        <div class="columns">
          <div class="column has-text-centered">
            <div class="is-size-4 has-text-weight-semibold">
              Top Spotlights of the week
            </div>
            <div class="py-3">
              <div class="spotlights mx-2" v-for="spotlight in spotlights" :key="spotlight.id" @click="spotlightClicked(spotlight.id)">
                <img class="spotlight-photo" :src="spotlight.thumbnail_url" />
                </br>
                <div class="is-size-5 has-text-weight-bold">
                  {{ spotlight.spieler.first_name }} {{ spotlight.spieler.last_name }}
                </div>
                <div class="is-size-6 has-text-gray has-text-weight-light">
                  {{ spotlight.spieler.title }} at {{ spotlight.spieler.company }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="py-2">
        <div class="tap-me">
          <div class="columns mx-2 px-1">
            <div class="column has-text-left">
              <div class="is-size-3 has-text-white has-text-weight-bold">
                Share your startup story
              </div>
              <div class="has-text-white">
                Are you a Founder working on a product to make the world a better
                place? Share your knowledge with our community and grow your
                audience of raving fans.
              </div>
              </br>
              <button class="button is-medium is-yellow has-text-white has-text-weight-semibold" @click="learnMoreButton">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SignupLogin from '~/components/core/SignupLogin.vue'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
    }),
  },
  methods: {
    getStarted() {
      if (this.isLoggedIn) {
        this.$router.push('/home')
      } else {
        this.openSignup()
      }
    },
    learnMoreButton() {
      this.$router.push('/founder-story')
    },
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
.hero-body {
  padding: 0px !important;
}

.creator {
  background: url("../assets/creators-img.png");
  min-height: 400px;
  justify-content: center;
  flex-direction: column;
  display: flex;
}

.tap-me {
  background: rgb(50, 121, 126) !important;
  min-height: 300px;
}

.spotlights {
  display: inline-block;
  cursor: pointer;
}

.spotlight-photo {
  max-width:  256px;
}

.get-started {
  height: 50px;
}

.grey-box {
  background: rgb(234, 234, 234) !important;
}

.spotlight-container {
  background: #fff !important;
}

.founder-container {
  background: #fff !important;
  padding-top: 30px;
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
