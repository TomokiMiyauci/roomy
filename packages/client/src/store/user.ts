import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import firebase from '@/plugins/firebase'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private _user: firebase.UserInfo | null = null
  private _id: string = ''
  private _successfulSignIn: boolean = false

  @Mutation
  setUser(user: firebase.User) {
    if (!user.providerData.length) return

    this._user = user.providerData[0]
  }

  @Mutation
  removeUser() {
    this._user = null
  }

  @Mutation
  setId(id: string) {
    this._id = id
  }

  @Mutation
  succeedSignIn() {
    this._successfulSignIn = true
  }

  @Mutation
  resetSuccessfulSignIn() {
    this._successfulSignIn = false
  }

  get user() {
    return this._user
  }

  get login(): boolean {
    return !!this._user
  }

  get id(): string {
    return this._id
  }

  get displayName(): string {
    if (!this._user || !this._user.displayName) return ''
    return this._user.displayName
  }

  get photoURL(): string {
    if (!this._user || !this._user.photoURL) return ''
    return this._user.photoURL
  }

  get successfulSignIn(): boolean {
    return this._successfulSignIn
  }
}
