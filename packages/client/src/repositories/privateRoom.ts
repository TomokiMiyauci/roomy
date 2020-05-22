import { roomReference } from '@/core/useFirestoreReference'
import { firestore } from '@/plugins/firebase'
import { user } from '@/store'
import { getTimestamps } from '@/utils/firestore'
import { generateRandomB64 } from '@/utils/secret'
import { PrivateRoom } from '~types/core'

export const createRoom = () => {
  const { collectionRef } = roomReference()
  const key = generateRandomB64()

  const room: PrivateRoom = {
    isPrivate: true,
    key,

    messageCount: 0,
    name: 'New Room',
    photoURL: '',
    ...getTimestamps()
  }

  return collectionRef.value.add(room)
}

export const existsDoc = async (documentPath: string): Promise<boolean> => {
  const { exists } = await firestore.doc(documentPath).get()

  return exists
}

export const joinRoom = (doc: string, isHost: boolean = false) => {
  const { displayName, photoURL, id } = user

  firestore
    .collection('rooms')
    .doc(doc)
    .collection('members')
    .doc(id)
    .set({
      id,
      displayName,
      photoURL,
      isHost
    })
}

export const getRoomKey = async (id: string) => {
  const { collectionRef } = roomReference()
  const documentData = await collectionRef.value.doc(id).get()
  // return collectionRef.value.doc(id).get()
  const data = documentData.data()
  return data ? (data.key as string) : ''
}
