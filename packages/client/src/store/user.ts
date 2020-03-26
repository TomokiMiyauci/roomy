import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import firebase from '@/plugins/firebase'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private _user: firebase.UserInfo | null = null

  @Mutation
  setUser(user: firebase.User) {
    if (!user.providerData.length) return

    this._user = user.providerData[0]
  }

  @Mutation
  removeUser() {
    this._user = null
  }

  get user() {
    return this._user
  }

  get login(): boolean {
    return !!this._user
  }

  get photoURL(): string {
    if (!this._user || !this._user.photoURL) return ''
    return this._user.photoURL
  }
}
