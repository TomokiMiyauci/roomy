import { Plugin } from '@nuxt/types'
import Vue from 'vue'

const errorHandler: Plugin = () => {
  Vue.config.errorHandler = (err, _, info) => {
    console.error(err, info)
  }
}

export default errorHandler
