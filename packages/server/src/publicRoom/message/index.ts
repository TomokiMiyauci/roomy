import { RecentMessage, Message, ShortMessage } from '~types/core'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const firestore = admin.firestore()

export const createPublicRoomMessage = functions
  .region('asia-northeast1')
  .firestore.document('public-rooms/{roomId}/messages/{messageId}')
  .onCreate(async (snapshot, { params }) => {
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

    const batch = firestore.batch()
    const increment = admin.firestore.FieldValue.increment(1)
    const uid = !data.author.isAnonymous ? data.author.ref.id : ''

    batch.update(snapshot.ref.parent.parent, {
      messageCount: increment,
      recent: recentMessage
    })

    if (uid) {
      batch.set(
        firestore
          .collection('users')
          .doc(uid)
          .collection('interested-rooms')
          .doc(params.roomId),
        { updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      )
    }

    const ref = await firestore
      .collectionGroup('view-histories')
      .where('ref', '==', snapshot.ref.parent.parent)
      .get()

    ref.forEach((doc) => {
      if (
        data.author.isAnonymous ||
        !doc.ref.parent.parent ||
        data.author.ref.id !== doc.ref.parent.parent.id
      ) {
        batch.update(doc.ref, {
          messageDiff: increment
        })
      }
    })

    return batch.commit()
  })
