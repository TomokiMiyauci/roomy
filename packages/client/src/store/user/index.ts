import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import firebase from '@/plugins/firebase'

type CustomUser = {
  uid: string
  photoURL: firebase.User['photoURL']
  displayName: firebase.User['displayName']
}

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

  @Action
  setUser(user: CustomUser): void {
    this.setDisplayName(user.displayName)
    this.setPhotoURL(user.photoURL)
    this.setId(user.uid)
  }

  @Action
  removeUser(): void {
    this.removeId()
    this.removeDisplayName()
    this.removePhotoURL()
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
    return this._displayName ? this._displayName : ''
  }

  get photoURL(): string {
    return this._photoURL ? this._photoURL : ''
  }

  get successfulSignIn(): boolean {
    return this._successfulSignIn
  }
}
