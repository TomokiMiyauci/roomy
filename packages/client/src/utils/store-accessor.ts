/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Firestore from '@/store/firestore'
import Rtc from '@/store/rtc'
import User from '@/store/user'

let firestore: Firestore
let rtc: Rtc
let user: User

function initializeStores(store: Store<any>): void {
  firestore = getModule(Firestore, store)
  rtc = getModule(Rtc, store)
  user = getModule(User, store)
}

export { initializeStores, firestore, rtc, user }
