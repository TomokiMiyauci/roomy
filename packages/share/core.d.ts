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
  photoURL: string
  description: string
  tags: string[]
}

type Id = { id? : string}

export type Profile = {
  displayName: NonNullable<firebase.User['displayName']>,
  photoURL: NonNullable<firebase.User['photoURL']>
} & Id

type BaseRoom = {
  name: string
  photoURL: string
  messageCount: number
  createdAt: firebase.firestore.Timestamp
  updatedAt: firebase.firestore.Timestamp
} & Id

type PublicRoomRecent = {
  author: Author | Anonymous
  shortMessage: string
  kind: MessageKind
  updatedAt: firebase.firestore.Timestamp
}

type PublicRoomRecentMerged = {
  author: Omit<Author, 'ref'> | Anonymous
  shortMessage: string
  kind: MessageKind
  updatedAt: firebase.firestore.Timestamp
}

export type PublicRoom = BaseRoom & { messageDiff? : number, tags: string[], description: string } & { recent: PublicRoomRecent }
export type PublicRoomMerged = BaseRoom & { messageDiff? : number, tags: string[], description: string } & { recent: PublicRoomRecentMerged }

type MessageKind = 'TEXT'

export type ViewHistory = {
  ref: firebase.firestore.DocumentReference<PublicRoom>,
  messageDiff: number
  updatedAt: firebase.firestore.Timestamp
}

export type FavoriteRoom = {
  ref: firebase.firestore.DocumentReference<PublicRoom>,
  updatedAt: firebase.firestore.Timestamp
}
