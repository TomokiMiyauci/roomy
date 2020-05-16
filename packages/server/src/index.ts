import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { RecentMessage, Message, ShortMessage } from '~types/core'

admin.initializeApp()
const firestore = admin.firestore()

type Profile = {
  displayName: firebase.User['displayName']
  photoURL: firebase.User['photoURL']
}

export const onCreateUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    await admin.auth().setCustomUserClaims(user.uid, {
      suspend: false
    })

    const { displayName: newDisplayName, photoURL: newPhotoURL } = user
    const displayName = newDisplayName ? newDisplayName : null
    const photoURL = newPhotoURL ? newPhotoURL : null
    const profile: Profile = {
      displayName,
      photoURL
    }

    const batch = firestore.batch()
    const timestamp = admin.firestore.FieldValue.serverTimestamp()

    batch.set(firestore.collection('profiles').doc(user.uid), {
      profile
    })

    batch.set(firestore.collection('users').doc(user.uid), {
      createdAt: timestamp,
      updatedAt: timestamp
    })

    return batch.commit()
  })

exports.onCreatePublicRoomMessage = functions
  .region('asia-northeast1')
  .firestore.document('public-rooms/{roomId}/messages/{messageId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data() as Message | undefined

    if (!data || !snapshot.ref.parent.parent) return

    const { kind, createdAt, updatedAt, author } = data

    let shortMessage: ShortMessage = 'No messages'

    switch (data.kind) {
      case 'TEXT': {
        shortMessage = data.text
        break
      }

      case 'AUDIO': {
        shortMessage = 'Audio posted'
        break
      }

      case 'IMAGE': {
        shortMessage = 'Image posted'
        break
      }
    }

    const recentMessage: RecentMessage = {
      createdAt,
      updatedAt,
      kind,
      shortMessage,
      author
    }

    return snapshot.ref.parent.parent.update({
      messageCount: admin.firestore.FieldValue.increment(1),
      recent: recentMessage
    })
  })
