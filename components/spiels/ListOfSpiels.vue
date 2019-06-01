<template>
  <div>
    <div
      v-for="spiel in spiels"
      :key="spiel.id"
      class="spiel-cell"
      @click="openNewSpielTab(spiel.id)"
    >
      <div class="columns is-mobile py-2">
        <div class="spielThumbnail">
          <v-avatar size="150" color="grey lighten-4" class="mx-2" tile>
            <v-img :src="spiel.thumbnail_url" alt="avatar"> </v-img>
          </v-avatar>
        </div>
        <div class="nameTitleAndDuration">
          <div class="has-text-weight-bold is-size-5">
            {{ spiel.spieler.first_name + ' ' + spiel.spieler.last_name }}
            <br />
          </div>
          <div class="has-text-weight-light is-size-6">
            {{ spiel.spieler.title }}
            <span v-if="spiel.spieler.company">
              at {{ spiel.spieler.company }}
            </span>
            <br />
          </div>
          <div v-if="spiel.duration < 60">
            <div class="has-text-weight-light is-size-6">
              {{ Math.ceil(spiel.duration) }}s
            </div>
          </div>
          <div v-else>
            <div class="has-text-weight-light is-size-6">
              {{ secondsToMinutesWithSeconds(spiel.duration) }}
            </div>
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
  name: 'ListOfSpiels',
  props: {
    spiels: {
      type: Array
    }
  },
  methods: {
    secondsToMinutesWithSeconds(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)

      return `${minutes}m ${remainingSeconds}s`
    },
    openNewSpielTab(id) {
      const routeData = this.$router.resolve({
        path: `/spiel/${id}`,
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style>
.spielThumbnail {
  margin-left: 25px;
}
.nameTitleAndDuration {
  width: 180px;

  margin-right: 130px;
  text-align: left;
}
.spiel-vid {
  width: 80px;
  margin-left: 35px;
}
.spiel-cell {
  cursor: pointer;
}
</style>
