<template>
  <div class="">
    <div
      v-for="{ id, question, asker, spiels_count, founder } in questions"
      :key="id"
      class="home-bg question-cell"
      @click="selectQuestion(id)"
    >
      <div class="columns is-mobile">
        <div class="column is-6 is-narrow">
          <div class="column is-3 is-pulled-left">
            <v-avatar size="65" color="grey lighten-4" class="mx-1">
              <v-img
                :src="asker.profile_photo_url"
                alt="avatar"
                @click="openUserProfileTab(asker.username)"
              >
              </v-img>
            </v-avatar>
          </div>
          <div class="nameAndTitle">
            <div
              class="has-text-weight-bold tight-line-height is-size-5"
              @click="openUserProfileTab(asker.username)"
            >
              {{ asker.first_name + ' ' + asker.last_name }}
              <br />
            </div>
            <div class="has-text-weight-light is-size-6">
              {{ asker.title }}
              <span v-if="asker.company">at {{ asker.company }}</span>
            </div>
            <br />
          </div>
        </div>

        <div v-if="!founder" class="spielIndicator has-text-centered">
          <div v-if="spiels_count">
            <div class="tight-line-height is-size-5  has-text-weight-semibold">
              {{ spiels_count }}
            </div>
          </div>
          <div v-else>
            <b>0</b>
          </div>
          <div class="has-text-grey-light">
            <div v-if="isSpiels(spiels_count)">
              Spiels
            </div>
            <div v-else>
              Spiel
            </div>
          </div>
        </div>
        <div
          v-else
          class="spielIndicator founderInterview has-text-centered has-text-blue"
        >
          Founder Interview
        </div>
      </div>
      <div class="columns mx-auto">
        <div class="column">
          <div class="has-text-left is-size-5">
            {{ question }}
          </div>
        </div>
      </div>
      <div>
        <hr class="divider-card" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QuestionCards',
  props: {
    questions: {
      type: Array
    }
  },
  data() {
    return {
      clickedOnUser: false
    }
  },
  methods: {
    selectQuestion: function(id) {
      if (this.clickedOnUser == false) {
        this.$router.push({
          path: `/question/${id}`
        })
      }
      this.clickedOnUser = false
    },
    isSpiels: function(count) {
      if (count === undefined || count > 1) {
        return true
      } else {
        return false
      }
    },
    openUserProfileTab(username) {
      this.clickedOnUser = true
      const routeData = this.$router.resolve({
        name: 'profile',
        params: {
          username: `${username}`
        }
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style lang="scss">
.spielIndicator {
  width: 50px;
  height: 50px;
  margin: auto;
  margin-right: 3%;
  margin-top: 4%;
}
.nameAndTitle {
  //  background-color: #FFA500; testing positioning
  width: 90%;
  height: 70px;
  margin-top: 20px;
  margin-left: 95px;
  text-align: left;
}
.tight-line-height {
  line-height: 80%;
}
.question-cell {
  cursor: pointer;
}
.divider-card {
  margin: 0.9rem 0;
}
.noun {
  width: 200px;
  overflow: hidden;
  z-index: 2;
}
</style>
