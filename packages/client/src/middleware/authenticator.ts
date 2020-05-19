import { Middleware } from '@nuxt/types'

import { auth } from '@/plugins/firebase'
import admin from '@/plugins/firebase-admin'
import { user as userStore } from '@/store'

const authenticator: Middleware = async (ctx) => {
  if (process.server && ctx.req.headers.cookie) {
    const result = await admin
      .auth()
      .verifyIdToken(ctx.req.headers.cookie)
      .catch((e: any) => {
        console.log(e)
      })
    if (!result) return
    const { name: displayName, picture: photoURL, user_id: uid } = result

    userStore.setUser({ displayName, photoURL, uid })
  } else if (process.client) {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        document.cookie = await user.getIdToken()

        userStore.setUser(user)
      }
    })
  }
}

export default authenticator
