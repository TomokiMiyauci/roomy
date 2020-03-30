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

export type User = Contributor | Anonymous

export type Contributor = {
  contributor: UserInfo
  isAnonymous: false
}

export type UserInfo = {
  name: string
  photoURL: string
}

export type UserReference = {
  userRef: firebase.firestore.DocumentReference
  isAnonymous: false
}

export type Anonymous = {
  isAnonymous: true
}

export type Room = {
  recent: {
    message: string
    contributor: User
  }
  name: string
  photoURL: string
}
