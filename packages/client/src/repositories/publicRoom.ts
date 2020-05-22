import {
  profileRef,
  publicRoomMessageRef,
  publicRoomRef
} from '@/core/useFirestoreReference'
import firebase from '@/plugins/firebase'
import { user } from '@/store'
import {
  Anonymous,
  Author,
  FirestoreFieldValue,
  MessageSet,
  Profile,
  PublicRoom,
  RoomOptions
} from '~types/core'

const getTimestamps = (): FirestoreFieldValue => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
  return { createdAt: timestamp, updatedAt: timestamp }
}

export const createMessage = (
  messageSet: MessageSet
): Promise<void | firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>> => {
  console.log(user, user.photoURL)
  const { collectionRef } = publicRoomMessageRef()

  const data = {
    author: getUser(user.id),

    ...getTimestamps(),
    ...messageSet
  }

  console.log(data)

  return collectionRef.value.add(data)
}

export const createRoom = (option: RoomOptions) => {
  const { collectionRef } = publicRoomRef()
  const { documentRef } = profileRef()
  const timestamp: firebase.firestore.Timestamp = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
  const publicRoom: PublicRoom = {
    ...option,
    messageCount: 0,
    recent: {
      author: {
        isAnonymous: false,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ref: documentRef.value
      },
      shortMessage: 'No message',
      kind: 'TEXT',
      updatedAt: timestamp
    },
    createdAt: timestamp,
    updatedAt: timestamp
  }

  return collectionRef.value.add(publicRoom)
}

export const getAuthor = (): { author: Author | Anonymous } => {
  const { documentRef } = profileRef()
  const author: Author | Anonymous = user.login
    ? {
        ...getUserInfo(),
        ref: documentRef.value,
        isAnonymous: false
      }
    : getAnonymous()

  return {
    author
  }
}

export const getUser = (documentPath?: string) => {
  return documentPath ? getContributor() : getAnonymous()
}

export const getContributor = () => {
  const { documentRef } = profileRef()

  return { ...getUserInfo(), isAnonymous: false, ref: documentRef.value }
}

export const getUserInfo = (): Profile => {
  return {
    displayName: user.displayName,
    photoURL: user.photoURL
  }
}

export const getAnonymous = (): Anonymous => {
  return {
    isAnonymous: true
  }
}
