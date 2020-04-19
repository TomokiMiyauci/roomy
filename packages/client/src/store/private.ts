import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { useFirestore } from '@/core/useFirestore'
import { firestore } from '@/plugins/firebase'
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
  sRoom() {
    const rooms = useFirestore(firestore.collection('rooms'))
    this.setRoom(rooms.value as PrivateRoom[])
  }

  get roomId() {
    return this._rooms
  }
}
