type MessageKinds =
  | { kind: 'TEXT'; text: string }
  | { kind: 'IMAGE'; imageURL: string; size: number }
  | { kind: 'AUDIO'; audioURL: string; size: number }

export type MessageSet = MessageKinds

export type Public = FirestoreFieldValue & MessageSet & User

export type FirestoreFieldValue = {
  id?: string
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}

export type User = UserReference | Anonymous

export type UserReference = {
  userRef: firebase.firestore.DocumentReference
  isAnonymous: true
}

export type Anonymous = {
  isAnonymous: false
}
