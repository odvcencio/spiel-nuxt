<template>
  <div class="pt-5">
    <div class="is-size-4 py-2 has-text-centered">
      {{ this.question.question }}
    </div>
    <div class="columns py-2 is-centered has-text-centered">
      <div id="container" class="column center-video"></div>
    </div>
    <div v-if="isLoggedIn" class="columns py-2 is-centered is-vcentered">
      <div class="column home-bg mx-auto is-6">
        <div v-if="!hasIncompleteProfile">
          <v-avatar size="32" color="grey lighten-4" class="mx-1">
            <v-img
              :src="avatar"
              alt="avatar">
            </v-img>
          </v-avatar>
          <div class="textarea-container">
            <textarea v-model="comment" class="textarea comment-box" cols="200" :placeholder='placeholder' rows="1"/>
          </div>
        </div>
        <div v-else class="is-size-5">
          Please Complete Your Profile To Leave a Comment
        </div>
        <div class="py-3" v-if="comment !== ''">
          <button class="button is-blue is-pulled-right" @click="postComment">
            Comment
          </button>
        </div>
      </div>
    </div>
    <div v-if="hasComments" v-for="{ id, commenter, comment, created_time } in comments"
      :key="id" class="columns py-2 is-centered" :id="getCommentHash(id)">
      <div class="home-bg column is-4 is-10-touch mx-auto">
        <div class="is-size-5 tight-line-height columns pa-2">
          <v-avatar size="65" color="grey lighten-4" class="mx-1">
            <v-img
              :src="commenter.profile_photo_url"
              alt="avatar">
            </v-img>
          </v-avatar>
          <div class="name-tag has-text-left">
            {{ commenter.first_name }} {{ commenter.last_name }}
            </br>
            <div class="is-size-6 has-text-gray has-text-weight-light">
              {{ commenter.title }} at {{ commenter.company }}
            </div>
          </div>
          <div class="column has-text-right is-size-6 pa-2">
            {{ created_time | formatTime }}
          </div>
        </div>
        <div class="is-size-5 py-2">
          {{ comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpielPlayer from '@/components/spiels/SpielPlayer.vue'
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import { mapGetters, mapState } from 'vuex'
var moment = require('moment-twitter');

export default {
  head: {
    link: [
        { rel: 'stylesheet', href: 'https://vjs.zencdn.net/7.5.4/video-js.css' }
    ],
    script: [
        { src: 'https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js' },
        { src: 'https://vjs.zencdn.net/7.5.4/video.js' }
    ]
  },
  asyncData (context) {
    let uri = `https://dev.tryspiel.com/api/v1/spiels/${context.params.id}`
    return context.$axios.get(uri)
      .then((res) => {
        let firstName   = res.data.data.spiel.spieler.first_name
        let placeholder = `Leave ${firstName} a comment!`

        return {
          spiel:       res.data.data.spiel,
          spieler:     res.data.data.spiel.spieler,
          question:    res.data.data.spiel.question,
          url:         res.data.data.spiel.video_url,
          placeholder: placeholder,
          comments:    res.data.data.spiel.comments
        }
      })
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      hasIncompleteProfile: 'user/hasIncompleteProfile',
    }),
    ...mapState({
      avatar: state => state.user.profilePicture,
      token:  state => state.user.accessToken
    }),
    hasComments: function() {
      return this.comments && this.comments.length > 0
    }
  },
  filters: {
    formatTime: function(value) {
      if (!value) return
      var createdTime = moment(value).twitterShort()

      return createdTime
    }
  },
  name: 'Spiel',
  data() {
    return {
      spiel:       {},
      spieler:     {},
      question:    {},
      comments:    [],
      comment:     '',
      url:         '',
      placeholder: '',
      isReady:     false,
      player:      null
    };
  },
  components: {
    SpielPlayer
  },
  methods: {
    getCommentHash(id) {
      return `comment-${id}`
    },
    async postComment() {
      let uri = 'https://dev.tryspiel.com/api/v1/comment'
      try {
        const postObject = {
          comment:  this.comment,
          spiel_id: this.spiel.id
        }

        let message = await this.$axios.post(uri, postObject, { headers: { Authorization: this.token } })
        let refresh = `https://dev.tryspiel.com/api/v1/spiels/${this.spiel.id}`
        let { data } = await this.$axios.get(refresh)

        this.comments = data.data.spiel.comments
        this.comment  = ''
      } catch(e) {
        console.log(e)
      }
    },
    initPlayer() {
      var options = {
        "controls": true,
      }
      var player = videojs(document.getElementById("spielPlayer"), options)

      player.on('waiting', () => {
      })
      player.on('ready', () => {
        this.isReady = true
        player.show()
        player.play()
      })

      this.playerSetSrc(player, this.url)
      this.player = player

      this.player.hide()
    },
    playerDispose() {
      this.player.dispose();
      this.player = null
    },
    playerSetSrc(player, url) {
      player.src({
        type: "application/x-mpegURL",
        src: url
      });
    },
  },
  mounted: function() {
    var container = document.getElementById("container");
    var videoHTML = '<video id="spielPlayer" class="video-js vjs-default-skin vjs-big-play-centered"></video>'
    container.innerHTML = videoHTML

    this.initPlayer()
  },
  beforeDestroy: function() {
    this.playerDispose();
  }
}
</script>

<style>
.textarea-container {
  display: inline-flex;
  min-width: 475px;
}

.comment-box {
  border: none;
  width: 18ch;
}

.timestamp {
  display: inline-flex;
}

.name-tag {
  display: inline-block;
}

.show-video {
  visibility: visible;
}

.vjs-loading-spinner {
  display: none !important;
}
</style>
