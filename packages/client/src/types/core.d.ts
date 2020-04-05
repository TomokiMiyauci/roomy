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
  isPrivate: boolean
  members: string[]
  recent: {
    message: string
  } & User &
    FirestoreFieldValue
  name: string
  photoURL: string
} & FirestoreFieldValue

export type Private = {
  isPrivate: true
  secretKey: string
}

export type MessageSets = MessageKinds & User & FirestoreFieldValue

export type ShortMessage = 'Image posted' | 'Audio posted' | 'No messages'

type BaseRoom = {
  members: string[]
  name: string
  photoURL: string
} & RecentMessage &
  FirestoreFieldValue

export type RecentMessage = {
  recent: {
    shortMessage: ShortMessage
    kind: 'TEXT' | 'IMAGE' | 'AUDIO'
  } & User &
    FirestoreFieldValue
}

export type PublicRoom = BaseRoom & {
  isPrivate: false
}

export type PrivateRoom = BaseRoom & {
  isPrivate: true
  key: string
}
