<template>
  <div class="pt-5">
    <div class="pt-1 columns">
      <div class="column home-bg is-4-desktop mx-auto">
        <QuestionCards :questions="questionCard"/>
      </div>
    </div>

    <div class="pt-1 columns">
      <div class="column home-bg is-4-desktop mx-auto">
        <div id="container" class="center-video">
        </div>
      </div>
    </div>

    <div v-if="isLoggedIn" class="columns py-1 is-centered">
      <div class="column home-bg is-4-desktop">
        <div class="columns is-mobile px-3">
          <div class="column is-1 pt-3">
            <v-avatar size="32" color="grey lighten-4" class="pr-3">
              <v-img :src="avatar"
                alt="avatar">
              </v-img>
            </v-avatar>
          </div>
          <div class="column">
            <div class="textarea-container">
              <textarea v-model="comment"
              class="textarea comment-box"
              :placeholder='placeholder' rows="1"/>
            </div>
          </div>
        </div>
        <div class="columns home-bg" v-show="comment !== ''">
          <div class="column">
            <button class="button is-blue is-pulled-right" @click="postComment">
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="has-text-centered">
      <div class="columns">
        <div class="column home-bg is-4-desktop mx-auto">
          <div v-if="hasIncompleteProfile" class="is-size-4">
            Please Complete Your <nuxt-link to="/account">Profile</nuxt-link> To Leave a Comment
          </div>
          <div v-else class="is-size-4">
            Please <a @click="openSignup">Sign Up</a> To Leave A Comment
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasComments" class="pt-1 columns">
      <div class="column is-4-desktop mx-auto">
        <Comments :comments="this.comments"/>
      </div>
    </div>

  </div>
</template>

<script>
import SpielPlayer from '@/components/spiels/SpielPlayer.vue'
import QuestionCards from '@/components/questions/QuestionCards.vue'
import SignupLogin from '@/components/core/SignupLogin.vue'
import Comments from '@/components/spiels/Comments.vue'
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import { mapGetters, mapState } from 'vuex'

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
    },
    questionCard: function() {
      let question = [this.question]
      return question
    },
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
    SpielPlayer,
    QuestionCards,
    Comments,
    SignupLogin
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
  display: inline-block;
  width: 100%
}

.comment-box {
  border: none;
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
