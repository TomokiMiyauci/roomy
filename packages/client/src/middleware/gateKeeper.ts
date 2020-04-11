import { Middleware } from '@nuxt/types'

import { firestore } from '@/plugins/firebase'
const existsRoom = async (id: string) => {
  const doc = await firestore
    .collection('rooms')
    .doc(id)
    .get()

  return doc
}

const gateKeeper: Middleware = async ({ route, redirect }) => {
  const { roomId, key } = route.query
  if (!roomId || typeof roomId === 'object' || !key) {
    redirect('/')
    return
  }

  const documentData = await existsRoom(roomId)

  const data = documentData.data()

  if (!documentData.exists || !data || data.key !== key) {
    redirect('/')
  }
}

export default gateKeeper
