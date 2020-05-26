import {
  profileRef,
  publicRoomMessageRef,
  publicRoomRef
} from '@/core/useFirestoreReference'
import firebase from '@/plugins/firebase'
import { user } from '@/store'
import {
  Anonymous,
  Author,
  FirestoreFieldValue,
  MessageSet,
  Profile,
  PublicRoom,
  PublicRoomMerged,
  RoomOptions
} from '~types/core'

const getTimestamps = (): FirestoreFieldValue => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
  return { createdAt: timestamp, updatedAt: timestamp }
}

export const createMessage = (
  messageSet: MessageSet
): Promise<void | firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>> => {
  console.log(user, user.photoURL)
  const { collectionRef } = publicRoomMessageRef()

  const data = {
    author: getSender(user.id),

    ...getTimestamps(),
    ...messageSet
  }

  console.log(data)

  return collectionRef.value.add(data)
}

export const createRoom = (option: RoomOptions) => {
  const { collectionRef } = publicRoomRef()
  const { documentRef } = profileRef()
  const timestamp: firebase.firestore.Timestamp = firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp
  const publicRoom: PublicRoom = {
    ...option,
    messageCount: 0,
    recent: {
      author: {
        isAnonymous: false,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ref: documentRef.value
      },
      shortMessage: 'No message',
      kind: 'TEXT',
      updatedAt: timestamp
    },
    createdAt: timestamp,
    updatedAt: timestamp
  }

  return collectionRef.value.add(publicRoom)
}

export const getPublicRooms = (keyword: string) => {
  const { collectionRef } = publicRoomRef()

  return collectionRef.value
    .orderBy('name')
    .startAt(keyword)
    .endAt(`${keyword}\uF8FF`)
    .withConverter(publicRoomConverter)
    .limit(3)
    .get()
}

export const getPublicRoomsLatest = () => {
  const { collectionRef } = publicRoomRef()

  return collectionRef.value
    .orderBy('recent.updatedAt', 'desc')
    .withConverter(publicRoomConverter)
    .limit(5)
    .get()
}

const publicRoomConverter = {
  toFirestore(
    publicRoom: Promise<PublicRoomMerged>
  ): Promise<PublicRoomMerged> {
    console.log(222222222222, publicRoom)

    return publicRoom
  },

  async fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<PublicRoom>,
    options: firebase.firestore.SnapshotOptions
  ): Promise<PublicRoomMerged> {
    const publicRoom = snapshot.data(options)

    Object.defineProperty(publicRoom, 'id', {
      value: snapshot.id.toString(),
      writable: false
    })

    if (publicRoom.recent.author.isAnonymous) return publicRoom

    const result = await publicRoom.recent.author.ref.get()
    const { displayName, photoURL } = result.data()!
    const { recent, ...restRoom } = publicRoom

    const { author, ...restRecent } = recent

    const publicRoomMerged: PublicRoomMerged = {
      id: snapshot.id,
      ...restRoom,
      recent: {
        ...restRecent,
        ...recent,
        author: {
          isAnonymous: author.isAnonymous,
          displayName,
          photoURL
        }
      }
    }

    return publicRoomMerged
  }
}

export const getSender = (documentPath?: string) => {
  return documentPath ? getAuthor() : getAnonymous()
}

const getAuthor = (): Author => {
  const { documentRef } = profileRef()

  return { ...getProfile(), isAnonymous: false, ref: documentRef.value }
}

const getProfile = (): Profile => {
  return {
    displayName: user.displayName,
    photoURL: user.photoURL
  }
}

const getAnonymous = (): Anonymous => {
  return {
    isAnonymous: true
  }
}
