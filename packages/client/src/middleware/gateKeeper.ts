import { Middleware } from '@nuxt/types'

import { user } from '@/store'

const gateKeeper: Middleware = ({ redirect }) => {
  if (!user.login) {
    redirect('/public')
  }
}

export default gateKeeper
