import { Configuration } from '@nuxt/types'
import fs from 'fs'
import path from 'path'
// import i18n from './nuxt-i18n.config'

const autoprefixer = require('autoprefixer')
// const purgecss = require('@fullhuman/postcss-purgecss')

const config: Configuration = {
  mode: 'universal',

  srcDir: 'src',

  env: {
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.AUTH_DOMAIN!,

    API_KEY: process.env.API_KEY!,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN!,
    DATABASE_URL: process.env.DATABASE_URL!,
    PROJECT_ID: process.env.PROJECT_ID!,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET!,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID!,
    APP_ID: process.env.APP_ID!,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID!,
    DSN: process.env.DSN!,
    SKYWAY_KEY: process.env.SKYWAY_KEY!
  },

  router: {
    middleware: ['authenticator']
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - Roomy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],

    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=WebAnimations'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/transition.scss'],

  pageTransition: {
    name: 'fade'
  },

  // pageTransition: 'fade-right',

  layoutTransition: {
    name: 'fade-right'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/composition-api',
    '@/plugins/firebase',
    '@/plugins/pretty-bytes',
    '@/plugins/axios',
    '@/plugins/errorHandler',
    // { src: '@/plugins/vee-validate', ssr: false },
    { src: '@/plugins/axe', ssr: false },
    { src: '@/plugins/vue-typer', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv'
    // [
    //   '@nuxtjs/google-analytics',
    //   {
    //     id: 'UA-12301-2'
    //   }
    // ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sentry',
    '@nuxtjs/device'

    // Doc: https://github.com/nuxt-community/dotenv-module
    // ['nuxt-i18n', i18n]
  ],

  sentry: {
    dsn: process.env.DSN!
  },
  robots: {
    UserAgent: '*',
    Disallow: '/private'
  },

  pwa: {
    manifest: {
      name: 'Roomy',
      short_name: 'Roomy',
      description: 'Open chat platform',
      start_url: '/public',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      orientation: 'portrait',
      gcm_sender_id: '103953800507'
    },

    workbox: {
      runtimeCaching: [
        {
          urlPattern: '^https://fonts.(?:googleapis|gstatic).com/(.*)',
          handler: 'cacheFirst'
        },

        {
          urlPattern: '^https://polyfill.io/v3/polyfill.min.js',
          handler: 'cacheFirst'
        }
      ]
    }
  },

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
    customVariables: ['@/assets/variables.scss'],
    defaultAssets: {
      icons: false
    },
    optionsPath: path.resolve(__dirname, 'vuetify.options.ts')
  },
  /*
   ** Build configuration
   */
  build: {
    hardSource: true,
    extractCSS: process.env.NODE_ENV === 'production',
    postcss: {
      plugins: [
        autoprefixer({ grid: 'autoplace' })
        // purgecss({
        //   content: [
        //     path.join(__dirname, './src/**/*.ts'),
        //     path.join(__dirname, './src/**/*.vue'),
        //     path.join(__dirname, './src/**/*.js'),
        //     path.join(__dirname, './node_modules/vuetify/src/**/*.ts'),
        //     './node_modules/vuetify/dist/vuetify.js'
        //   ],
        //   whitelist: [
        //     'html',
        //     'body',
        //     'nuxt-progress',
        //     'spacer',
        //     'primary',
        //     'secondary',
        //     'accent',
        //     'error',
        //     'warning',
        //     'info',
        //     'success',
        //     'icon',
        //     'fab',
        //     'skeleton',
        //     'v-application',
        //     'v-application--wrap',
        //     'button',
        //     'input',
        //     'select',
        //     'textarea',
        //     'container',
        //     'row',
        //     'no-gutters',
        //     'col',
        //     'col-auto',
        //     'theme'
        //   ],
        //   whitelistPatterns: [
        //     /^v-/,
        //     /^theme-/,
        //     /^application--/,
        //     /(col|row|fill-height)/,
        //     /^icon/,
        //     /^(d-)/,
        //     /^(text)/,
        //     /.*-transition/,
        //     /^_/,
        //     /^v-((?!application).)*$/,
        //     /^theme--*/,
        //     /^container/
        //   ],
        //   whitelistPatternsChildren: [
        //     /^v-/,
        //     /^theme-/,
        //     /^application--/,
        //     /(col|row|fill-height)/,
        //     /^icon/,
        //     /^v-((?!application).)*$/,
        //     /^theme--*/
        //   ]
        // })
      ]
    },

    terser: {
      terserOptions: {
        compress: { drop_console: process.env.NODE_ENV === 'production' }
      }
    },

    splitChunks:
      process.env.NODE_ENV === 'production'
        ? {
            layouts: true
          }
        : undefined,

    extend(config) {
      if (process.env.NODE_ENV !== 'production') {
        return Object.assign({}, config, {
          devtool: 'source-map'
        })
      }
      return Object.assign({}, config, {})
    }

    // publicPath: process.env.AUTH_DOMAIN
  },

  typescript: {
    typeCheck: {
      vue: true,
      memoryLimit: 4096,
      eslint: true,
      measureCompilationTime: true,
      reportFiles: ['src/**/*'],
      checkSyntacticErrors: true
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  server:
    process.env.NODE_ENV === 'https'
      ? {
          port: 3000,
          host: '0.0.0.0',
          https: {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
          }
        }
      : undefined
}

export default config
