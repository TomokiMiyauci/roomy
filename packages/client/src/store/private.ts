import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { getData, isDef } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { PrivateRoom } from '@/types/core'
@Module({
  name: 'private',
  stateFactory: true,
  namespaced: true
})
export default class Private extends VuexModule {
  private _rooms: PrivateRoom[] = []

  @Mutation
  setRoom(rooms: PrivateRoom[]) {
    this._rooms = rooms
  }

  @Action
  subscribe() {
    if (this._rooms.length) return
    const { collectionRef } = roomReference()
    collectionRef.value
      .where('isPrivate', '==', false)
      .orderBy('recent.updatedAt', 'desc')
      .onSnapshot((snapshot) => {
        this.setRoom(snapshot.docs.map(getData).filter(isDef) as PrivateRoom[])
      })
  }

  get rooms() {
    return this._rooms
  }
}
