import firebase, { firestore } from '@/plugins/firebase'
import { user } from '@/store'
import {
  Anonymous,
  Contributor,
  FirestoreFieldValue,
  MessageSet,
  Public,
  UserInfo,
  UserReference
} from '@/types/core'

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

  const data: Public = {
    ...getTimestamps(),
    ...messageSet,
    ...getUser(user.id)
  }

  return firestore
    .collection('public-rooms')
    .add(data)
    .catch((e) => {
      console.log(e)
    })
}

type MessageKind = 'TEXT'

type Author = {
  isAnonymous: boolean
  displayName: string
  photoURL: string
}

type BaseRoom = {
  name: string
  photoURL: string
  messageCount: number
  recent: {
    author: Author | Anonymous
    shortMessage: string
    kind: MessageKind
    updatedAt: firebase.firestore.Timestamp
  }
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

type PublicRoom = BaseRoom

export const createRoom = (option: { name: string; photoURL: string }) => {
  const timestamp: firebase.firestore.Timestamp = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
  const publicRoom: PublicRoom = {
    ...option,
    messageCount: 0,
    recent: {
      author: {
        isAnonymous: false,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      shortMessage: 'No message',
      kind: 'TEXT',
      updatedAt: timestamp
    },
    createdAt: timestamp,
    updatedAt: timestamp
  }

  return firestore.collection('public-rooms').add(publicRoom)
}

export const getUser = (documentPath?: string) => {
  return documentPath ? getContributor() : getAnonymous()
}

export const getContributor = (): Contributor => {
  return { contributor: getUserInfo(), isAnonymous: false }
}

export const getUserInfo = (): UserInfo => {
  return {
    displayName: user.displayName,
    photoURL: user.photoURL
  }
}

export const getUserReference = (documentPath: string): UserReference => {
  return {
    userRef: firestore.collection('users').doc(documentPath),
    isAnonymous: false
  }
}
export const getAnonymous = (): Anonymous => {
  return {
    isAnonymous: true
  }
}
