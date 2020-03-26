import { Middleware } from '@nuxt/types'

import { auth } from '@/plugins/firebase'
import { user as userStore } from '@/store'

const authenticator: Middleware = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      userStore.setUser(user)
    } else {
      userStore.removeUser()
    }
  })
}

export default authenticator
