<template>
  <div class="modal-card mx-auto home-bg" style="max-width:380px; background-color:rgb(241,241,241);">
    <div class="modal-card-body px-2 home-bg">
      <div class="columns is-centered">
        <div class="column">
          <div id="container-video" class="center-video">
          </div>
        </div>
      </div>
      <div v-if="cameraReady">
        <div class="columns is-centered">
          <div class="column">
            <div v-if="cameraReady" class="field is-grouped is-grouped-centered">
              <p class="control">
                <a class="button is-blue is-medium" @click="startRecording">TAKE</a>
              </p>
              <p class="control">
                <a class="button is-blue is-medium" v-if="readyToShare" @click='share'>SAVE</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import { mapGetters, mapState } from 'vuex';
import user from '@/api/user';

export default {
  name: 'ProfilePhotoTaker',
  data() {
      return {
        player: '',
        blob: {},
        readyToShare: false,
        cameraReady: false,
        uploadURL: '',
      };
  },
  props: {
    questionID: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn:  'user/isLoggedIn',
      getNewPhoto: 'user/getNewPhoto'
    }),
    ...mapState({
      token: state => state.user.accessToken
    }),
  },
  methods: {
    pictureUploaded() {
      this.$emit('pic-uploaded', this.getNewPhoto)
    },
    startRecording() {
      this.player.record().start();
    },
    stopRecording() {
      this.player.record().stop();
    },
    playerInitialize(){
      var options = {
        controls: false,
        fluid: false,
        loop: true,
        controlBar: {
          volumePanel: false,
          fullscreenToggle: false,
          recordToggle: false,
        },
        width: 320,
        height: 240,
        debug: true,
        plugins: {
          record: {
            image: true,
            debug: true,
          }
        }
      }
      this.player = videojs('spielPhoto', options);
      this.player.record().getDevice();
    },
    playerDispose() {
      this.player.record().destroy();
    },
    playerGetError() {
      return this.player.error();
    },
    playerEventError() {
      console.log( this.playerGetError() )
    },
    playerEventReady() {
      this.cameraReady = true;
    },
    playerEventEnded() {
      this.player.play();
    },
    finishRecord() {
      this.blob = this.player.recordedData;

      this.readyToShare = true;
    },
    share() {
      // strip off the data: url prefix to get just the base64-encoded bytes
      var data = this.blob.replace(/^data:image\/\w+;base64,/, "");
      var bs = atob(data);
      var buffer = new ArrayBuffer(bs.length);
      var ba = new Uint8Array(buffer);
      for (var i = 0; i < bs.length; i++) {
          ba[i] = bs.charCodeAt(i);
      }
      var file = new Blob([ba], { type: "image/jpeg" });
      var formData = new FormData();
      formData.append('photo', file, 'newProfilePic');

      if (this.readyToShare) {
        user.updateProfilePhoto(
          () => {
            this.pictureUploaded();
          },
          formData,
          this.token
        )
      }
    },
    playerSetupEvents()
    {
      this.player.on('ended', function(){ window.playerEvents.playerEventEnded(); });
      this.player.on('volumechange', function(){ window.playerEvents.playerEventVolume(); });
      this.player.on('error', function(){ window.playerEvents.playerEventError(); });
      this.player.on('ready', function(){ window.playerEvents.playerEventReady(); });
      this.player.on('finishRecord', function(){ window.playerEvents.finishRecord(); });
      this.player.on('finishConvert', function(){ window.playerEvents.finishConvert(); });
    },
  },
  mounted: function() {
    var container = document.getElementById("container-video");
    var videoHTML = '<video id="spielPhoto" class="video-js"></video>'
    container.innerHTML = videoHTML

    window.playerEvents = this;
    this.playerInitialize();
    this.playerSetupEvents();
  },
  beforeDestroy: function() {
    this.playerDispose();
  }
}
</script>

<style>
</style>
