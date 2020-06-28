import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { isDef } from '@/core/useFirestore'
import { userRef } from '@/core/useFirestoreReference'
import { PublicRoom } from '~types/core'

@Module({
  name: 'user/interested-rooms',
  stateFactory: true,
  namespaced: true
})
export default class InterestedRoom extends VuexModule {
  private _interestedRooms: any = []
  private _unsubscribe: Function | undefined = undefined

  @Mutation
  setInterestedRooms(interestedRooms: any) {
    this._interestedRooms = interestedRooms
  }

  @Action
  subscribe(force: boolean = false) {
    if (!force && this.loaded) return
    const { documentRef } = userRef()

    documentRef.value
      .collection('interested-rooms')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(async (snapshot) => {
        const interestedRooms = await Promise.all(
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

        this.setInterestedRooms(interestedRooms)
      })
  }

  get loaded(): boolean {
    return !!this._unsubscribe
  }

  get interestedRooms() {
    return this._interestedRooms
  }
}
