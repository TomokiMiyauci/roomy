import firebase from '@/plugins/firebase'
import { user } from '@/store'
import { PrivateRoom, PublicRoom } from '@/types/core'
import { Message } from '~types/core'

type Sometime = 'createdAt' | 'updatedAt'

export const getTimestamps = (): {
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
} => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()

  return { createdAt: timestamp, updatedAt: timestamp }
}

export const getTimestamp = (sometime: Sometime) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()

  return { [sometime]: timestamp }
}

export const generateInviteURL = (room: PrivateRoom | PublicRoom) => {
  const baseURL = process.env.baseUrl
  return room.isPrivate
    ? `${baseURL}/private/${room.id}`
    : `${baseURL}/public/${room.id}`
}

export const isOwn = (message: Message): boolean => {
  return (
    !!user.id &&
    !message.author.isAnonymous &&
    message.author.name === user.displayName
  )
}
