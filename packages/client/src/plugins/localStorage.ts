import { Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

const localStorage: Plugin = ({ store }) => {
  createPersistedState({
    key: 'userInfo',
    paths: ['user']
  })(store)
}

export default localStorage
