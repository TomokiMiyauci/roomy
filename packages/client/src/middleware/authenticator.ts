import { Middleware } from '@nuxt/types'

import { auth } from '@/plugins/firebase'
import { user as userStore } from '@/store'

const authenticator: Middleware = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user)

      userStore.setUser(user)
      userStore.setId(user.uid)
    } else {
      userStore.removeUser()
    }
  })
}

export default authenticator
