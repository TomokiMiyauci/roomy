import { messageReference } from '@/core/useFirestoreReference'
import firebase, { firestore } from '@/plugins/firebase'
import { user } from '@/store'
import {
  Anonymous,
  Author,
  Contributor,
  FirestoreFieldValue,
  Message,
  MessageSet,
  UserInfo,
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
  const { collectionRef } = messageReference()

  const data: Message = {
    ...getTimestamps(),
    ...messageSet,
    ...getAuthor()
  }

  return collectionRef.value.add(data).catch((e) => {
    console.log(e)
  })
}

export const getAuthor = (
  documentPath?: string
): { author: Author | Anonymous } => {
  const author: Author | Anonymous = documentPath
    ? {
        ...getUserInfo(),
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
