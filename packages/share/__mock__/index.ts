import { Profile  } from "../core";
// import { firestore } from "firebase";

// // firebase.initializeApp({projectId: 'test'})

const userName = 'authenticated'
// const timestamp = firestore.FieldValue.serverTimestamp() as firestore.Timestamp
export const profile:Profile = {
  displayName: userName,
  photoURL: ''
}

const timestamp = 'Friday'

export const author = {
  isAnonymous: false,
  ...profile
}

export const publicRoom = {
  name: 'Roomy',
  photoURL: '',
  messageCount: 0,
  recent: {
    author: {
      isAnonymous: true
    },
    shortMessage: 'No message',
    kind: 'TEXT',
    updatedAt: timestamp
  },
  tags: [ 'Public', 'Open'],
  createdAt: timestamp,
  updatedAt: timestamp

}
