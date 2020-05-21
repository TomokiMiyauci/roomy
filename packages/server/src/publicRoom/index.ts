import { PublicRoom } from '~types/core'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const firestore = admin.firestore()

export const createPublicRoom = functions
  .region('asia-northeast1')
  .firestore.document('public-rooms/{roomId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data() as PublicRoom | undefined

    if (!data || data.recent.author.isAnonymous) return

    return firestore
      .collection('users')
      .doc(data.recent.author.ref.id)
      .collection('favorite-rooms')
      .doc(snapshot.id)
      .set({
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        ref: snapshot.ref
      })
  })
