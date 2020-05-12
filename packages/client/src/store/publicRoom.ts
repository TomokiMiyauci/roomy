import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { getData, isDef } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { PublicRoom } from '@/types/core'
@Module({
  name: 'publicRoom',
  stateFactory: true,
  namespaced: true
})
export default class Public extends VuexModule {
  private _rooms: PublicRoom[] = []

  @Mutation
  setRoom(rooms: PublicRoom[]) {
    this._rooms = rooms
  }

  @Action
  subscribe() {
    if (this._rooms.length) return
    const { collectionRef } = roomReference()
    collectionRef.value
      .orderBy('recent.updatedAt', 'desc')
      .onSnapshot((snapshot) => {
        this.setRoom(snapshot.docs.map(getData).filter(isDef) as PublicRoom[])
      })
  }

  get rooms() {
    return this._rooms
  }
}
