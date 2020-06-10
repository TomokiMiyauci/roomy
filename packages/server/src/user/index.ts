import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Profile } from '~types/core'
const firestore = admin.firestore()

module.exports.onCreateUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    await admin.auth().setCustomUserClaims(user.uid, {
      suspend: false
    })

    const { displayName: newDisplayName, photoURL: newPhotoURL } = user
    const displayName = newDisplayName ? newDisplayName : ''
    const photoURL = newPhotoURL ? newPhotoURL : ''
    const profile: Profile = {
      displayName: displayName,
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
