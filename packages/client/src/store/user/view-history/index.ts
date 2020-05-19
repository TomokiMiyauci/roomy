import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { isDef } from '@/core/useFirestore'
import { userRef } from '@/core/useFirestoreReference'
import { PublicRoom } from '~types/core'

@Module({
  name: 'user/view-history',
  stateFactory: true,
  namespaced: true
})
export default class ViewHistory extends VuexModule {
  private _viewHistories: any = []
  private _unsubscribe: Function | undefined = undefined

  @Mutation
  setViewHistories(viewHistories: any) {
    this._viewHistories = viewHistories
  }

  @Action
  subscribe(force: boolean = false) {
    if (!force && this.loaded) return
    const { documentRef } = userRef()

    documentRef.value
      .collection('view-histories')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(async (snapshot) => {
        const viewHistories = await Promise.all(
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

        this.setViewHistories(viewHistories)
      })
  }

  get loaded(): boolean {
    return !!this._unsubscribe
  }

  get viewHistories() {
    return this._viewHistories
  }
}
