<template>
  <div>
    <div v-for="{ id, commenter, comment, created_time } in comments"
      :key="id" class="columns pb-1" :id="getCommentHash(id)">
      <div class="home-bg column mx-auto">
        <div class="is-size-5 tight-line-title columns">
          <v-avatar size="65" color="grey lighten-4" class="ma-2">
            <v-img
              :src="commenter.profile_photo_url"
              alt="avatar">
            </v-img>
          </v-avatar>
          <div class="name-tag has-text-left pt-4 has-text-weight-semibold">
            {{ commenter.first_name }} {{ commenter.last_name }}
            </br>
            <div class="is-size-6 has-text-light-gray has-text-weight-light">
              {{ commenter.title }} at {{ commenter.company }}
            </div>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column">
          </div>
          <div class="column is-10-desktop is-11-touch">
            <div class="is-size-5 pb-2">
              {{ comment }}
            </div>
            <div class="pt-2 is-size-6 has-text-weight-light has-text-gray">
              {{ created_time | formatTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require('moment-twitter');

export default {
  name: 'Comments',
  props: {
    comments: {
      type: Array
    }
  },
  filters: {
    formatTime: function(value) {
      if (!value) return
      var createdTime = moment(value).twitterLong()

      var lastChar = createdTime[createdTime.length -1];

      if (isNaN(parseInt(lastChar, 10))) {
        createdTime = createdTime + ' ago'
      }

      return createdTime
    }
  },
  methods: {
    getCommentHash(id) {
      return `comment-${id}`
    },
  }
}
</script>
<style>
.tight-line-title {
  line-height: 90%;
}
</style>
