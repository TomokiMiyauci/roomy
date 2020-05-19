import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { isDef } from '@/core/useFirestore'
import { userRef } from '@/core/useFirestoreReference'
import { PublicRoom } from '~types/core'

@Module({
  name: 'user/favorite-rooms',
  stateFactory: true,
  namespaced: true
})
export default class FavoriteRooms extends VuexModule {
  private _favoriteRooms: any = []
  private _unsubscribe: Function | undefined = undefined

  @Mutation
  setFavoriteRooms(favoriteRooms: any) {
    this._favoriteRooms = favoriteRooms
  }

  @Action
  subscribe(force: boolean = false) {
    if (!force && this.loaded) return
    const { documentRef } = userRef()

    documentRef.value
      .collection('favorite-rooms')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(async (snapshot) => {
        const favoriteRooms = await Promise.all(
          snapshot.docs
            .map(async (value) => {
              const data = value.data()
              if (!data) return data

              const { ref, messageDiff } = data

              const doc = await ref.get()
              const {
                name,
                photoURL,
                createdAt,
                messageCount,
                recent
              } = doc.data()! as PublicRoom
              if (!recent.author.isAnonymous) delete recent.author.ref
              const publicRoom = {
                name,
                photoURL,
                createdAt,
                recent,
                messageCount,
                messageDiff,
                updatedAt: data.updatedAt
              }

              Object.defineProperty(publicRoom, 'id', {
                value: value.id.toString(),
                writable: false
              })

              return publicRoom
            })
            .filter(isDef)
        )

        this.setFavoriteRooms(favoriteRooms)
      })
  }

  get loaded(): boolean {
    return !!this._unsubscribe
  }

  get favoriteRooms() {
    return this._favoriteRooms
  }
}
