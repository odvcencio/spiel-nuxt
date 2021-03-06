import pkg from './package'
import webpack from 'webpack'
import axios from 'axios'

export default {
  router: {
    middleware: 'check-auth',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  env: {
    cognitoRegion:   'us-east-1',
    cognitoPoolID:   'us-east-1_8iKxdd5uh',
    cognitoClientID: '3t2gp1mkch8p4mm3eksg7gs7tj',
    localStorageKey: 'CognitoIdentityServiceProvider.'
  },

  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
  },

  // generate dynamic routes, do this for spiels only
  generate: {

  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },

  /*
   ** Global CSS
   */
  css: [
    'video.js/dist/video-js.css',
    'videojs-record/dist/css/videojs.record.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/upchunk', ssr: false },
    { src: '@/plugins/aws' },
    { src: '~/plugins/localStorage', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    'nuxt-buefy',
    'nuxt-fontawesome'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  buefy: {
    materialDesignIcons: false,
    defaultIconPack: 'fas',
    defaultIconComponent: 'font-awesome-icon'
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        videojs: 'video.js', 'window.videojs': 'video.js',
        RecordRTC: 'recordrtc', 'window.RecordRTC': 'recordrtc'
      })
    ],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    vendor: ['video.js'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {

      }

      config.resolve.alias['videojs'] = 'video.js'
      config.resolve.alias['WaveSurfer'] = 'wavesurfer.js'
      config.resolve.alias['RecordRTC'] = 'recordrtc'
      config.resolve.alias['vue'] = 'vue/dist/vue.js'
    }
  }
}
