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
    .collection('public')
    .add(data)
    .catch((e) => {
      console.log(e)
    })
}

export const getUser = (documentPath?: string) => {
  return documentPath ? getContributor() : getAnonymous()
}

export const getContributor = (): Contributor => {
  return { contributor: getUserInfo(), isAnonymous: false }
}

export const getUserInfo = (): UserInfo => {
  return {
    name: user.displayName,
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
