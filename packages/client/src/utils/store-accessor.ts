/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Firestore from '@/store/firestore'
import Rtc from '@/store/rtc'

let firestore: Firestore
let rtc: Rtc

function initializeStores(store: Store<any>): void {
  firestore = getModule(Firestore, store)
  rtc = getModule(Rtc, store)
}

export { initializeStores, firestore, rtc }
