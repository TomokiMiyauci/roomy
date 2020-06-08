import { Profile } from '../core'
// import { firestore } from "firebase";

// // firebase.initializeApp({projectId: 'test'})

const userName = 'authenticated'
export const displayName = 'Roomy'
export const photoURL = 'https://cdn.vuetifyjs.com/images/john.jpg'
export const roomName = 'Roomy Official'
// const timestamp = firestore.FieldValue.serverTimestamp() as firestore.Timestamp
export const profile: Profile = {
  displayName: userName,
  photoURL: ''
}

export const timestamp: firebase.firestore.Timestamp = {
  seconds: 1000000000,
  nanoseconds: 20000000000,
  toDate: () => new Date(),
  toMillis: () => 0,
  isEqual: () => true,
  valueOf: () => 'test'
}

export const author = {
  isAnonymous: false,
  ...profile
}

export const publicRoom = {
  name: roomName,
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
  tags: ['Public', 'Open'],
  createdAt: timestamp,
  updatedAt: timestamp
}
