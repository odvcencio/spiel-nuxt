<template>
  <div class="pt-4 columns">
    <div class="column is-7 mx-auto">
      <div class="container-fs px-5">
        <div class="columns py-5">
          <div class="column has-text-centered">
            <span class="is-size-1 has-text-weight-bold" style="color:white;">
              Founder Story
            </span>
            </br>
            <div class="is-size-5 has-text-weight-light" style="color:white;">
              Tell the world the story behind your<br/>
              startup
            </div>
            <br/>
            <button class="button is-white brand-buttons-fs has-text-weight-semibold" @click="brandButtons">
              GET STARTED
            </button>
          </div>
        </div>
      </div>

      <div class="spotlight-container px-5">
        <div class="columns">
          <div class="column has-text-centered">
            <div class="is-size-4 has-text-weight-semibold">
              Top Founder Stories of the week
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

      <div class="creator-fs">
        <div class="columns is-vcentered">
          <div class="column has-text-centered has-text-white">
            <img class="missionIcon" src="../../assets/mission-icon.png" />
            <br/>
            <div class="is-size-4 has-text-weight-bold" style="color:black;">
              Share your mission
            </div>
            <div class="is-size-6" style="color:gray;">
              Break the ice and start conversation with<br/>
              people who are interested in your mission.
            </div>
          </div>
        </div>
      </div>

      <div class="comments-sf px-5">
        <div class="columns">
          <div class="column has-text-centered">
            <div class="is-size-3 has-text-weight-semibold">
              Comments for Conversations
            </div>
            <p style="color:black;">Learn what others think about your mission,<br/>find believers who will back you</p>
          </div>
        </div>
      </div>

      <div class="mx-2 px-1">
        <div class="columns tap-me-fs">
          <div class="column has-text-left">
            <div class="is-size-3 has-text-white has-text-weight-bold">
              Ready to get started?
            </div>
            <p style="color:white;">All questions are optional, and can be answered at<br/>your pace.</p>
            </br>
            <button class="button is-yellow learn-more has-text-white has-text-weight-semibold" @click="letsGoButton">
              LETS GO
            </button>
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
    brandButtons() {
      if (this.isLoggedIn) {
        this.$router.push('/home')
      } else {
        this.openSignup()
      }
    },
    letsGoButton() {
      this.$router.push('/founders')
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
.comments-sf {
  background: #fff !important;
  height: 320px;
  padding-top: 10%;
  padding-bottom: 10%;
}

.missionIcon {
    height: 150px;
    width: 180px;
    margin-bottom: 20px;
}

.hero-body {
  padding: 0px !important;
}

.creator-fs {
  background: rgb(228, 240, 245) !important;
  min-height: 400px;
  justify-content: center;
  flex-direction: column;
  display: flex;
}

.learn-more {
  width: 13%;
  height: 40px;
}

.tap-me-fs {
  background: rgb(19, 91, 176) !important;
  min-height: 350px;
  padding-left: 5%;
  padding-top: 5%;
}

.spotlights {
  display: inline-block;
  cursor: pointer;
}

.spotlight-photo {
  max-width:  256px;
}

.brand-buttons-fs {
  width: 30%;
  height: 50px;
}

.grey-box {
  background: rgb(234, 234, 234) !important;
}
/* .spotlight-container {
  background: #fff !important;
  padding-top: 10%;
  padding-bottom: 10%;
} */
.container-fs {
  background: rgb(50, 121, 126) !important;
  height: 17%;
  padding-top: 25px;
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
