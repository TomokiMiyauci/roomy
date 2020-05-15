import { Profile ,PublicRoom } from "../core";
import firebase,{ firestore } from "firebase";

firebase.initializeApp({projectId: 'test'})

const userName = 'authenticated'
const timestamp = firestore.FieldValue.serverTimestamp() as firestore.Timestamp
export const profile:Profile = {
  displayName: userName,
  photoURL: ''
}


export const author = {
  isAnonymous: false,
  ...profile,
  ref: firestore().collection('profiles').doc(userName) as firestore.DocumentReference<Profile>
}

export const publicRoom:PublicRoom = {
  name: '',
  photoURL: '',
  messageCount: 0,
  recent: {
    author,
    shortMessage: 'No message',
    kind: 'TEXT',
    updatedAt: timestamp
  },
  createdAt: timestamp,
  updatedAt: timestamp

}
