import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { isDef } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { PublicRoom, PublicRoomMerged } from '~types/core'

@Module({
  name: 'publicRoom',
  stateFactory: true,
  namespaced: true
})
export default class Public extends VuexModule {
  private _rooms: PublicRoomMerged[] = []
  private _unsubscribe: Function | undefined = undefined

  @Mutation
  setRooms(rooms: PublicRoomMerged[]) {
    this._rooms = rooms
  }

  @Mutation
  setUnsubscribe(unsubscribe: Function) {
    this._unsubscribe = unsubscribe
  }

  @Action
  subscribe(force: boolean = false) {
    if (!force && this.loaded) return

    const { collectionRef } = roomReference()
    const unsubscribe = collectionRef.value
      .orderBy('recent.updatedAt', 'desc')
      .onSnapshot(async (snapshot) => {
        const publicRooms = await Promise.all(
          snapshot.docs
            .map(async (value) => {
              const data = value.data() as PublicRoom
              if (!data) return data
              if (data.recent.author.isAnonymous) {
                Object.defineProperty(data, 'id', {
                  value: value.id.toString(),
                  writable: false
                })
                return data
              }
              const doc = await data.recent.author.ref.get()
              const { displayName, photoURL } = doc.data()!
              const { recent, ...restRoom } = data
              const { author, ...restRecent } = recent

              const publicRoom: PublicRoomMerged = {
                ...restRoom,
                recent: {
                  ...restRecent,
                  ...recent,
                  author: {
                    isAnonymous: author.isAnonymous,
                    displayName,
                    photoURL
                  }
                }
              }

              Object.defineProperty(publicRoom, 'id', {
                value: value.id.toString(),
                writable: false
              })

              return publicRoom
            })
            .filter(isDef)
        )

        this.setRooms(publicRooms)
        this.setUnsubscribe(unsubscribe)
      })
  }

  get rooms() {
    return this._rooms
  }

  get loaded(): boolean {
    return !!this._unsubscribe
  }
}
