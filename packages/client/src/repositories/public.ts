import firebase, { firestore } from '@/plugins/firebase'
import { user } from '@/store'
import {
  Anonymous,
  FirestoreFieldValue,
  MessageSet,
  Public,
  UserReference
} from '@/types/core'

const getTimestamps = (): FirestoreFieldValue => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
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
  return documentPath ? getUserReference(documentPath) : getAnonymous()
}

export const getUserReference = (documentPath: string): UserReference => {
  return {
    userRef: firestore.collection('users').doc(documentPath),
    isAnonymous: true
  }
}
export const getAnonymous = (): Anonymous => {
  return {
    isAnonymous: false
  }
}
