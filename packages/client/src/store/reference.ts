import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'reference',
  stateFactory: true,
  namespaced: true
})
export default class Reference extends VuexModule {
  private _roomId: string = ''
  private _messageId: string = ''

  @Mutation
  setRoomId(roomId: string) {
    this._roomId = roomId
  }

  setMessageId(messageId: string) {
    this._messageId = messageId
  }

  get roomId() {
    return this._roomId
  }

  get messageId() {
    return this._messageId
  }
}
