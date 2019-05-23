import pkg from './package'
import webpack from 'webpack'
import axios from 'axios'

export default {
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // generate dynamic routes, do this for spiels only
  generate: {

  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

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
    '@/plugins/aws',
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
