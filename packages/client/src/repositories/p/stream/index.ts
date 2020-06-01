import { publicRoomStreamRef } from '@/core/useFirestoreReference'

export const createStream = (peerId: string) => {
  const { collectionRef } = publicRoomStreamRef()

  return collectionRef.value.doc('1').set({ peerId }, { merge: true })
}

export const getStream = () => {
  const { collectionRef } = publicRoomStreamRef()

  return collectionRef.value.doc('1').get()
}
