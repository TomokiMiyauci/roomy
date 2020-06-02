import { Middleware } from '@nuxt/types'
import { remove, set } from 'js-cookie'

import { auth } from '@/plugins/firebase'
import { user as userStore } from '@/store'

const authenticator: Middleware = () => {
  if (process.client) {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true)
        set('__session', token)

        userStore.setUser(user)
      } else {
        userStore.removeUser()
        remove('__session')
      }
    })
  }
}

export default authenticator
