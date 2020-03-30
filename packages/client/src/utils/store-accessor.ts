/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Reference from '@/store/reference'
import Rtc from '@/store/rtc'
import User from '@/store/user'

let reference: Reference
let rtc: Rtc
let user: User

function initializeStores(store: Store<any>): void {
  reference = getModule(Reference, store)
  rtc = getModule(Rtc, store)
  user = getModule(User, store)
}

export { initializeStores, reference, rtc, user }
