<template>
  <div class="columns pt-5">
    <div id="container" class="column center-video"></div>
  </div>
</template>

<script>
import SpielPlayer from '@/components/spiels/SpielPlayer.vue'
import videojs from 'video.js';
import "video.js/dist/video-js.css";

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
        return {
          spiel:      res.data.data.spiel,
          spieler:    res.data.data.spiel.spieler,
          question:   res.data.data.spiel.question,
          url:        res.data.data.spiel.video_url,
        }
      })
  },
  name: 'Spiel',
  data() {
    return {
      spiel:     {},
      spieler:   {},
      question:  {},
      url:       '',
      isReady:   false,
      player:    null
    };
  },
  components: {
    SpielPlayer
  },
  methods: {
    initPlayer() {
      var options = {
        "controls": true,
      }
      var player = videojs(document.getElementById("spielPlayer"), options)

      player.on('waiting', () => {
        console.log('waiting')
        //player.hide()
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
.show-video {
  visibility: visible;
}
.vjs-loading-spinner {
  display: none !important;
}
</style>
