/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Private from '@/store/privateRoom'
import Public from '@/store/publicRoom'
import Reference from '@/store/reference'
import Rtc from '@/store/rtc'
import User from '@/store/user'
import FavoriteRoom from '@/store/user/favorite-room'
import ViewHistory from '@/store/user/view-history'

let reference: Reference
let rtc: Rtc
let user: User
let privateRoom: Private
let publicRoom: Public
let viewHistory: ViewHistory
let favoriteRoom: FavoriteRoom

function initializeStores(store: Store<any>): void {
  reference = getModule(Reference, store)
  rtc = getModule(Rtc, store)
  user = getModule(User, store)
  privateRoom = getModule(Private, store)
  publicRoom = getModule(Public, store)
  viewHistory = getModule(ViewHistory, store)
  favoriteRoom = getModule(FavoriteRoom, store)
}

export {
  initializeStores,
  reference,
  rtc,
  user,
  privateRoom,
  publicRoom,
  viewHistory,
  favoriteRoom
}
