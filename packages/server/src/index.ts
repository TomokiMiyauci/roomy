import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

import { createPublicRoom } from './publicRoom/'
import { createPublicRoomMessage } from './publicRoom/message'

const firestore = admin.firestore()

type Profile = {
  displayName: firebase.User['displayName']
  photoURL: firebase.User['photoURL']
}

export const onCreatePublicRoom = createPublicRoom

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

    batch.set(firestore.collection('profiles').doc(user.uid), profile)

    batch.set(firestore.collection('users').doc(user.uid), {
      createdAt: timestamp,
      updatedAt: timestamp
    })

    return batch.commit()
  })

export const onCreatePublicRoomMessage = createPublicRoomMessage
