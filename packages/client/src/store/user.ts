import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { isDef } from '@/core/useFirestore'
import { userRef } from '@/core/useFirestoreReference'
import firebase from '@/plugins/firebase'
import { PublicRoom } from '~types/core'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private _id: string = ''
  private _displayName: firebase.User['displayName'] = null
  private _photoURL: firebase.User['photoURL'] = null
  private _successfulSignIn: boolean = false
  private _providerData: firebase.UserInfo | null = null
  private _viewHistories: any = []

  @Mutation
  setViewHistories(viewHistories: any) {
    this._viewHistories = viewHistories
  }

  @Action
  subscribe() {
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

  get viewHistories() {
    return this._viewHistories
  }

  @Action
  setUser(user: firebase.User): void {
    this.setDisplayName(user.displayName)
    this.setPhotoURL(user.photoURL)
    this.setProviderData(user)
    this.setId(user.uid)
  }

  @Action
  removeUser(): void {
    this.removeId()
    this.removeDisplayName()
    this.removePhotoURL()
    this.removeProviderData()
  }

  @Mutation
  setProviderData(user: firebase.User): void {
    if (!user.providerData.length) return
    this._providerData = user.providerData[0]
  }

  @Mutation
  removeProviderData(): void {
    this._providerData = null
  }

  @Mutation
  setDisplayName(displayName: firebase.User['displayName']): void {
    this._displayName = displayName
  }

  @Mutation
  removeDisplayName(): void {
    this._displayName = null
  }

  @Mutation
  setPhotoURL(photoURL: firebase.User['photoURL']): void {
    this._photoURL = photoURL
  }

  @Mutation
  removePhotoURL(): void {
    this._photoURL = null
  }

  @Mutation
  setId(id: string): void {
    this._id = id
  }

  @Mutation
  removeId(): void {
    this._id = ''
  }

  @Mutation
  succeedSignIn(): void {
    this._successfulSignIn = true
  }

  @Mutation
  resetSuccessfulSignIn(): void {
    this._successfulSignIn = false
  }

  get user() {
    return {
      displayName: this.displayName,
      photoURL: this.photoURL,
      uid: this.id
    }
  }

  get login(): boolean {
    return !!this._id
  }

  get id(): firebase.User['uid'] {
    return this._id
  }

  get displayName(): string {
    if (!this._providerData || !this._providerData.displayName) return ''
    return this._displayName
      ? this._displayName
      : this._providerData.displayName
  }

  get photoURL(): string {
    if (!this._providerData || !this._providerData.photoURL) return ''
    return this._photoURL ? this._photoURL : this._providerData.photoURL
  }

  get successfulSignIn(): boolean {
    return this._successfulSignIn
  }
}
