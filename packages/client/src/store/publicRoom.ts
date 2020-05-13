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
  private _unsubscribe: Function | undefined = undefined

  @Mutation
  setRoom(rooms: PublicRoom[]) {
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
    collectionRef.value
      .orderBy('recent.updatedAt', 'desc')
      .onSnapshot((snapshot) => {
        this.setRoom(snapshot.docs.map(getData).filter(isDef) as PublicRoom[])
      })
  }

  get rooms() {
    return this._rooms
  }

  get loaded(): boolean {
    return !!this._unsubscribe
  }
}
