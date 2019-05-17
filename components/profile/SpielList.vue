<template>
  <div class="">
    <div v-for="spiel in userSpiels"
      :key="spiel.id"
      class="home-bg question-cell"
      @click="openNewSpielTab(spiel.id)">
      <div class="columns is-mobile">
        <div class="column is-6 is-narrow">
          <div class="column is-3 is-pulled-left">
            <v-avatar
              size="65"
              color="grey lighten-4"
              class="mx-1">
              <v-img
                :src="spiel.question.asker.profile_photo_url"
                alt="avatar"
                @click="openUserProfileTab(spiel.question.asker.username)">
              </v-img>
            </v-avatar>
          </div>
          <div class="nameAndTitle">
            <div class="has-text-weight-bold tight-line-height is-size-5"
              @click="openUserProfileTab(spiel.question.asker.username)">

              {{ spiel.question.asker.first_name + ' ' + spiel.question.asker.last_name }}

              <br />
            </div>
            <div class="has-text-weight-light is-size-6">
              {{ spiel.question.asker.title }}
            </div>
            <br />
          </div>
        </div>
        <div class="answered has-text-centered">
          Answered
        </div>
      </div>
      <div class="columns mx-auto">
        <div class="column">
          <div class="has-text-left is-size-5">
            {{ spiel.question.question }}
          </div>
        </div>
      </div>
      <div>
        <hr class="divider-card" />
      </div>
    </div>
  </div> <!-- Root -->
</template>

<script>
export default {
  name: 'SpielList',
  data() {
      return {};
  },
  props: {
    userSpiels: {
      type: Array
    }
  },
  methods: {
    openUserProfileTab(username) {
      let routeData = this.$router.resolve(
        {
          name: 'profile',
          params: {
            username: `${username}`
          }
        }
      );
      window.open(routeData.href, '_blank');
    },
    openNewSpielTab(id) {
      let routeData = this.$router.resolve(
        {
          name: 'spiel',
          params: {
            id: `${id}`
          }
        }
      );
      window.open(routeData.href, '_blank');
    }
  },

}
</script>

<style lang="scss">
.answered {
  width: 100px;
  height: 20px;
  margin: auto;
  margin-top: 5%;
  margin-right: 2%;
  color: #32CD32;
}

.questionFeed {
  position: absolute;
  left: 50%;
  right: 50%;
  width: 1850px;
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
</style>
