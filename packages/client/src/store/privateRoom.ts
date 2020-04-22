import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { getData, isDef } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { user } from '@/store'
import { PrivateRoom } from '@/types/core'

@Module({
  name: 'privateRoom',
  stateFactory: true,
  namespaced: true
})
export default class Private extends VuexModule {
  private _rooms: PrivateRoom[] = []

  @Mutation
  set(rooms: PrivateRoom[]) {
    this._rooms = rooms
  }

  @Action
  subscribe() {
    if (this._rooms.length) return
    const { collectionRef } = roomReference()
    collectionRef.value
      .where('isPrivate', '==', true)
      .where('members', 'array-contains', user.id)
      .orderBy('recent.updatedAt', 'desc')
      .onSnapshot((snapshot) => {
        this.set(snapshot.docs.map(getData).filter(isDef) as PrivateRoom[])
      })
  }

  get rooms() {
    return this._rooms
  }
}
