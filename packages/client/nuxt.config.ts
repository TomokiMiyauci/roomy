import * as path from 'path'
import { Configuration } from '@nuxt/types'
import i18n from './nuxt-i18n.config'

const config: Configuration = {
  mode: 'universal',

  srcDir: 'src',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/composition-api', '@/plugins/firebase'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['nuxt-i18n', i18n]
  ],
  /*
   ** dotenv options
   */
  dotenv: {
    path: process.cwd()
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: false
    },
    optionsPath: './vuetify.options.ts'
  },
  /*
   ** Build configuration
   */
  build: {
    terser: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === 'production' }
      }
    },

    splitChunks: {
      layouts: true
    },

    hardSource: process.env.NODE_ENV === 'development',

    extend(config) {
      return Object.assign({}, config, {
        devtool: 'source-map'
      })
    },

    publicPath: process.env.AUTH_DOMAIN
  },

  typescript: {
    typeCheck: {
      eslint: true
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src')
    }
  }
}

export default config
