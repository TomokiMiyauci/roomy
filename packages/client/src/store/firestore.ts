import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'firestore',
  stateFactory: true,
  namespaced: true
})
export default class Firestore extends VuexModule {
  playroomId = ''

  @Mutation
  setPlayroomId(playroomId: string) {
    this.playroomId = playroomId
  }

  get getPlayroomId() {
    return this.playroomId
  }
}
