<template>
  <div>
    <div v-if="!isUpload">
      <div id="record" class="center-video"></div>
      <br />
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <a
            v-if="!isRecording"
            class="button is-blue is-medium"
            @click="startRecording"
            >{{ recordButtonText }}</a
          >
        </p>
        <p class="control">
          <a
            v-if="isRecording"
            class="button is-blue is-medium"
            @click="stopRecording"
            >STOP</a
          >
        </p>
        <p class="control">
          <a v-if="readyToShare" class="button is-blue is-medium" @click="share"
            >SHARE</a
          >
        </p>
      </div>
    </div>
    <div v-else>
      <span class="has-text-centered">Uploading...</span>
      <progress class="progress is-blue" :value="progress" max="100"></progress>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import spiels from '../../api/spiels'
import { mapGetters, mapState } from 'vuex'
import { Decoder, Encoder, tools, Reader } from 'ts-ebml';
const UpChunk = process.client ? require('@mux/upchunk/dist/upchunk.js') : '';
const Record  = process.client ? require('videojs-record/dist/videojs.record.js') : ''


export default {
  name: 'SpielRecorder',
  props: {
    questionID: {
      type: Number
    },
    question: {
      type: String
    }
  },
  data() {
    return {
      player: '',
      blob: {},
      readyToShare: false,
      isUpload: false,
      progress: 0,
      uploadURL: '',
      duration: 0.0,
      videoID: '',
      isRecording: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    }),
    ...mapState({
      token: state => state.user.accessToken
    }),
    recordButtonText: function() {
      return this.duration == 0.0 ? 'RECORD' : 'RETAKE'
    }
  },
  mounted: function() {
    var container = document.getElementById("record");
    var videoHTML = '<video class="video-js" id="spielRecorder"></video>'
    container.innerHTML = videoHTML

    window.playerEvents = this
    this.playerInitialize()
    this.playerSetupEvents()
  },
  beforeDestroy: function() {
    this.playerDispose()
  },
  methods: {
    returnToQuestions() {
      this.$emit('return-to-questions')
    },
    readAsArrayBuffer(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(blob)
        reader.onloadend = () => {
          resolve(reader.result)
        }
        reader.onerror = ev => {
          reject(ev.error)
        }
      })
    },
    injectMetadata(blob) {
      const decoder = new Decoder()
      const reader = new Reader()
      reader.logging = false
      reader.drop_default_duration = false

      return this.readAsArrayBuffer(blob).then(buffer => {
        const elms = decoder.decode(buffer)
        elms.forEach(elm => {
          reader.read(elm)
        })
        reader.stop()

        const refinedMetadataBuf = tools.makeMetadataSeekable(
          reader.metadatas,
          this.duration,
          reader.cues
        )
        const body = buffer.slice(reader.metadataSize)

        return new Blob([refinedMetadataBuf, body], { type: blob.type })
      })
    },
    startRecording() {
      this.player.record().start()
    },
    stopRecording() {
      this.player.record().stop()
      this.duration = this.player.record().getDuration()
    },
    playerInitialize() {
      const options = {
        controls: true,
        fluid: false,
        loop: true,
        controlBar: {
          volumePanel: false,
          fullscreenToggle: false,
          recordToggle: false
        },
        width: 600,
        height: 400,
        plugins: {
          record: {
            audio: true,
            video: true,
            maxLength: 300,
            debug: true,
            frameWidth: 600,
            frameHeight: 400,
          }
        }
      }
      this.player = videojs('spielRecorder', options)
      this.player.record().getDevice()
    },
    playerDispose() {
      this.player.record().destroy()
      this.player = ''
    },
    playerGetError() {
      return this.player.error().message
    },
    playerEventError() {
      console.log(this.playerGetError())
    },
    playerEventReady() {
      this.player.volume(1)
    },
    playerEventEnded() {
      this.player.play()
    },
    finishRecord() {
      this.isRecording = false
      this.injectMetadata(this.player.recordedData).then(
        seekableBlob => {
          this.blob = seekableBlob
          this.readyToShare = true
      })
    },
    startRecord() {
      this.isRecording = true
      this.readyToShare = false
    },
    finishConvert() {
      this.blob = this.player.convertedData
    },
    share() {
      this.player.pause()

      this.isUpload = true

      if (this.isLoggedIn) {
        spiels.getUploadURL(uploadURLObject => {
          this.videoID = uploadURLObject.id
          const upload = UpChunk.createUpload({
            endpoint: uploadURLObject.url,
            file: this.blobToFile(this.blob, 'newSpiel'),
            chunkSize: 512
          })

          upload.on('error', err => {
            console.error('💥 🙀', err.detail)
          })

          upload.on('progress', progress => {
            this.progress = progress.detail
          })

          upload.on('success', () => {
            if (this.question != '') {
              spiels.insertInterview(
                () => {
                  this.$router.go()
                },
                this.token,
                {
                  question: this.question,
                  question_id: this.questionID,
                  video_id: this.videoID
                }
              )
            } else {
              spiels.insertSpiel(
                () => {
                  this.$router.go()
                },
                this.token,
                {
                  question_id: this.questionID,
                  video_id: this.videoID
                }
              )
            }
          })
        }, this.token)
      } else {
        this.returnToQuestions()
      }
    },
    playerSetupEvents() {
      this.player.on('ended', function() {
        window.playerEvents.playerEventEnded()
      })
      this.player.on('volumechange', function() {
        window.playerEvents.playerEventVolume()
      })
      this.player.on('error', function() {
        window.playerEvents.playerEventError()
      })
      this.player.on('ready', function() {
        window.playerEvents.playerEventReady()
      })
      this.player.on('finishRecord', function() {
        window.playerEvents.finishRecord()
      })
      this.player.on('finishConvert', function() {
        window.playerEvents.finishConvert()
      })
      this.player.on('startRecord', function() {
        window.playerEvents.startRecord()
      })
    },
    blobToFile(theBlob, fileName) {
      return new File([theBlob], fileName)
    }
  }
}
</script>

<style>
</style>
