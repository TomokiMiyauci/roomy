import { PublicRoom } from '~types/core'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const firestore = admin.firestore()

module.exports.createPublicRoom = functions
  .region('asia-northeast1')
  .firestore.document('public-rooms/{roomId}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data() as PublicRoom | undefined

    if (!data || data.recent.author.isAnonymous) return

    const batch = firestore.batch()
    const timestamp = admin.firestore.FieldValue.serverTimestamp()

    batch.set(
      firestore
        .collection('users')
        .doc(data.recent.author.ref.id)
        .collection('favorite-rooms')
        .doc(snapshot.id),
      {
        updatedAt: timestamp,
        ref: snapshot.ref
      },
      { merge: true }
    )

    const { tags } = data

    tags.forEach((tag) => {
      batch.set(
        firestore.collection('tags').doc(tag),
        {
          value: tag,
          tagCount: admin.firestore.FieldValue.increment(1),
          updatedAt: timestamp
        },
        { merge: true }
      )
    })

    return batch.commit()
  })
