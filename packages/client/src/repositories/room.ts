import { roomReference } from '@/core/useFirestoreReference'
import firebase from '@/plugins/firebase'
import { getUser } from '@/repositories/public'
import { user } from '@/store'
import { PrivateRoom, PublicRoom, Room } from '@/types/core'
import { getTimestamp, getTimestamps } from '@/utils/firestore'
import { generateRandomB64 } from '@/utils/secret'

export const createRoom = () => {
  const { collectionRef } = roomReference()

  const room: Room = {
    isPrivate: false,
    members: [user.id],
    recent: {
      message: 'No messages',
      isAnonymous: true,
      ...getTimestamps()
    },
    name: 'New Room',
    photoURL: '',
    ...getTimestamps()
  }

  return collectionRef.value.add(room)
}

export const createPublicRoom = () => {
  const { collectionRef } = roomReference()

  const room: PublicRoom = {
    isPrivate: false,
    name: 'New Room',
    members: [],
    messageCount: 0,
    photoURL: '',
    recent: {
      shortMessage: 'No messages',
      kind: 'TEXT',
      author: {
        isAnonymous: true
      },
      ...getTimestamps()
    },
    ...getTimestamps()
  }
  return collectionRef.value.add(room)
}

export const createPrivateRoom = () => {
  const { collectionRef } = roomReference()
  const key = generateRandomB64()

  const room: PrivateRoom = {
    isPrivate: true,
    key,
    members: [user.id],
    recent: {
      shortMessage: 'No messages',
      kind: 'TEXT',
      author: {
        isAnonymous: true
      },
      ...getTimestamps()
    },
    messageCount: 0,
    name: 'New Room',
    photoURL: '',
    ...getTimestamps()
  }

  return collectionRef.value.add(room)
}

export const updateRoom = () => {
  const u = getUser(user.id)
  const { documentRef } = roomReference()

  return documentRef.value.update({
    ...u,
    ...getTimestamp('updatedAt')
  })
}

export const getRoomKey = async (id: string) => {
  const { collectionRef } = roomReference()
  const documentData = await collectionRef.value.doc(id).get()
  // return collectionRef.value.doc(id).get()
  const data = documentData.data()
  return data ? (data.key as string) : ''
}

export const updateRecent = (message: string) => {
  const { documentRef } = roomReference()

  return documentRef.value.update({
    recent: {
      message,
      ...getUser(user.id),
      ...getTimestamp('updatedAt')
    }
  })
}

export const joinRoom = (id: string, userId: string) => {
  const { collectionRef } = roomReference()

  return collectionRef.value.doc(id).update({
    members: firebase.firestore.FieldValue.arrayUnion(userId)
  })
}
