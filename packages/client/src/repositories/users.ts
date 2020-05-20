import { publicRoomRef, userRef } from '@/core/useFirestoreReference'
import firebase from '@/plugins/firebase'

export const enterRoom = (uid: string) => {
  const { documentRef } = userRef()
  const { documentRef: prRef } = publicRoomRef()

  return documentRef.value
    .collection('view-histories')
    .doc(uid)
    .set(
      {
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        messageDiff: 0,
        ref: prRef.value
      },
      {
        merge: true
      }
    )
}

export const favor = (): Promise<void> => {
  const { documentRef } = userRef()
  const { documentRef: prRef } = publicRoomRef()
  return documentRef.value
    .collection('favorite-rooms')
    .doc(prRef.value.id)
    .set(
      {
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        ref: prRef.value
      },
      { merge: true }
    )
}

// export const get = async () => {
//   const ref = await firestore
//     .collectionGroup('view-histories')
//     .where(
//       'ref',
//       '==',
//       firestore.collection('public-rooms').doc('EdG8q88GcVAP2nR6GKIH')
//     )
//     .get()

//   console.log(ref)
//   console.log(ref.docs, ref.query)

//   ref.forEach(async (doc) => {
//     await doc.ref.update({
//       messageDiff: firebase.firestore.FieldValue.increment(1)
//     })
//   })
// }
