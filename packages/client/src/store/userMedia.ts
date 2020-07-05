import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'userMedia',
  stateFactory: true,
  namespaced: true
})
export default class UserMedia extends VuexModule {
  private _userMedia: MediaStream | undefined = undefined
  private _globalUserMedia: MediaStream | undefined = undefined
  private _isShowLocal = false
  private _isShowGlobal = false

  @Mutation
  setUserMedia(userMedia: MediaStream) {
    this._userMedia = userMedia
  }

  @Mutation
  setGlobalUserMedia(userMedia: MediaStream) {
    this._globalUserMedia = userMedia
  }

  @Mutation
  setShowLocal(isShow: boolean) {
    this._isShowLocal = isShow
  }

  @Mutation
  setShowGlobal(isShow: boolean) {
    this._isShowGlobal = isShow
  }

  @Mutation
  stop() {
    if (this._userMedia) {
      this._userMedia.getVideoTracks().forEach((t) => {
        t.stop()
      })
    }

    if (this._globalUserMedia) {
      this._globalUserMedia.getVideoTracks().forEach((t) => {
        t.stop()
      })
    }

    this._isShowLocal = false
    this._isShowGlobal = false
  }

  @Mutation
  switch(show: 'LOCAL' | 'GLOBAL'): void {
    if (show === 'LOCAL') {
      this._isShowLocal = true
      this._isShowGlobal = false
    } else {
      this._isShowLocal = false
      this._isShowGlobal = true
    }
  }

  get userMedia(): MediaStream | undefined {
    return this._userMedia
  }

  get globalUserMedia(): MediaStream | undefined {
    return this._globalUserMedia
  }

  get isShowLocal(): boolean {
    return this._isShowLocal
  }

  get isShowGlobal(): boolean {
    return this._isShowGlobal
  }
}
