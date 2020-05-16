import firebase from 'firebase'

type MessageKinds =
  MessageText | MessageImage | MessageAudio

type MessageText = {
  kind: 'TEXT',
  text: string
}

type MessageImage = {
  kind: 'IMAGE',
  imageURL: string,
  size: number
}

type MessageAudio = {
  kind: 'AUDIO',
  audioURL: string,
  size: number
}

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
  isAnonymous: false
  ref: firebase.firestore.DocumentReference<Profile>
} & Profile

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

export type ShortMessage = 'Image posted' | 'Audio posted' | 'No messages' | string

export type RecentMessage = {
  shortMessage: ShortMessage
  kind: 'TEXT' | 'IMAGE' | 'AUDIO'
  author: Author | Anonymous
} & BaseField


export type PrivateRoom = BaseRoom & {
  isPrivate: true
  key: string
}

export type RoomOptions = {
  name: string
  image: string
}


export type Profile = {
  displayName: NonNullable<firebase.User['displayName']>,
  photoURL: NonNullable<firebase.User['photoURL']>
}

type BaseRoom = {
  name: string
  photoURL: string
  messageCount: number
  recent: {
    author: Author | Anonymous
    shortMessage: string
    kind: MessageKind
    updatedAt: firebase.firestore.Timestamp
  }
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

export type PublicRoom = BaseRoom & { messageDiff? : number}

export type PublicRoomOmitRef = {
  name: string
  photoURL: string
  messageCount: number
  recent: {
    author: Omit<Author, 'ref'> | Anonymous
    shortMessage: string
    kind: MessageKind
    updatedAt: firebase.firestore.Timestamp
  }
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
}

type MessageKind = 'TEXT'
