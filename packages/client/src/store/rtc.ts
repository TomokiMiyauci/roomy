import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'rtc',
  stateFactory: true,
  namespaced: true
})
export default class Rtc extends VuexModule {
  private _offerSDP = ''
  private _id = ''

  @Mutation
  setId(id: string) {
    this._id = id
  }

  @Mutation
  setOfferSDP(offerSDP: string) {
    this._offerSDP = offerSDP
  }

  get id() {
    return this._id
  }

  get offerSDP() {
    return this._offerSDP
  }
}
