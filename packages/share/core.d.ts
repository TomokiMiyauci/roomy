import firebase from 'firebase'

type MessageKinds =
  | { kind: 'TEXT'; text: string }
  | { kind: 'IMAGE'; imageURL: string; size: number }
  | { kind: 'AUDIO'; audioURL: string; size: number }

export type MessageSet = MessageKinds

export type Public = FirestoreFieldValue & MessageSet & User

export type Message = MessageSet & { author: Author | Anonymous } & BaseField

export type Id = {
  id: string
}

export type BaseField = {
  id?: string
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

export type FirestoreFieldValue = {
  id?: string
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

export type User = Contributor | Anonymous

export type Contributor = {
  contributor: UserInfo
  isAnonymous: false
}

export type Author = {
  name: string
  photoURL: string
  isAnonymous: false
}

export type UserInfo = {
  name: string
  photoURL: string
}

export type Anonymous = {
  isAnonymous: true
}

export type UserReference = {
  userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  isAnonymous: boolean
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

export type ShortMessage = 'Image posted' | 'Audio posted' | 'No messages'

type BaseRoom = {
  members: string[]
  name: string
  photoURL: string
  recent: RecentMessage
  messageCount: number
} & BaseField

export type RecentMessage = {
  shortMessage: ShortMessage
  kind: 'TEXT' | 'IMAGE' | 'AUDIO'
  author: Author | Anonymous
} & BaseField

export type PublicRoom = BaseRoom & {
  isPrivate: false
}

export type PrivateRoom = BaseRoom & {
  isPrivate: true
  key: string
}

export type RoomOptions = {
  name: string
  image: string
}
