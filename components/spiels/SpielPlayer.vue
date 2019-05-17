<template>
  <div class="container">
    <div class="center-video video-container pt-5">
      <video id="spielPlayer" class="video-js"></video>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'SpielPlayer',
  data() {
      return {
        player: '',
        isReady: false,
      };
  },
  props: {
    link: {
      type: String
    },
    retake: {
      type: Boolean
    }
  },
  methods: {
    playerInitialize()
    {
      this.player = videojs('spielPlayer', { "controls": true, "autoplay": true, "preload": "auto" });
    },
    playerDispose()
    {
      this.player.dispose();
    },
    playerSetSrc(url)
    {
      this.player.src({
        type: "application/x-mpegURL",
        src: url
      });
    },
    playerGetError(){
      return this.player.error().message;
    },
    playerEventError(){
      console.log( this.playerGetError() )
    },
    playerEventReady(){
      this.isReady = true;
      this.playerSetSrc(this.link);
      this.player.volume(1);
    },
    playerEventEnded(){
      // console.log(videojs.log.history())
    },
    retakeEvent() {
      this.$emit('retake');
    },
    playerSetupEvents()
    {
      this.player.on('ended', function(){ window.playerEvents.playerEventEnded(); });
      this.player.on('volumechange', function(){ window.playerEvents.playerEventVolume(); });
      this.player.on('error', function(){ window.playerEvents.playerEventError(); });
      this.player.on('ready', function(){ window.playerEvents.playerEventReady(); });
    },
  },
  mounted: function()
  {
    window.playerEvents = this;
    this.playerInitialize();
    this.playerSetupEvents();
  },
  beforeDestroy: function()
  {
    this.playerDispose();
  }
}
</script>

<style>
.center-video {
  display: flex;
  justify-content: center;
  padding-bottom: 0% !important;
}
</style>
