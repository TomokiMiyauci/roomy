import { Context } from '@nuxt/types'
import { parse } from 'cookie'
import { ActionTree, Store } from 'vuex'
import { ActionContext } from 'vuex/types'

import { user as userStore } from '@/store'
import { initializeStores } from '@/utils/store-accessor'

const initializer = (store: Store<any>) => initializeStores(store)

export const plugins = [initializer]
export const state = () => ({})
export type RootState = ReturnType<typeof state>
export * from '@/utils/store-accessor'

export const actions: ActionTree<any, any> = {
  nuxtServerInit: async (
    _: ActionContext<RootState, RootState>,
    { req }: Context
  ) => {
    if (!req.headers.cookie) return
    const token = parse(req.headers.cookie).access_token
    if (!token) return

    let admin: any

    if (process.server) {
      admin = require('firebase-admin')
      if (!admin.apps.length) {
        const serviceAccount = require('../../secret.json')
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: process.env.DATABASE_URL
        })
      }
    }

    const result = await admin
      .auth()
      .verifyIdToken(token)
      .catch((e: any) => {
        console.log(e)
      })

    if (!result) return
    const { name: displayName, picture: photoURL, user_id: uid } = result
    userStore.setUser({ displayName, photoURL, uid })
  }
}
