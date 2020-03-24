import firebase, { firestore } from '@/plugins/firebase'
import { FirestoreFieldValue } from '@/types/core'

const getTimestamps = (): FirestoreFieldValue => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  return { createdAt: timestamp, updatedAt: timestamp }
}

// type SDP = {
//   offerSDP: RTCSessionDescription['sdp']
//   answerSDP: RTCSessionDescription['sdp']
// }

export const createP2P = (
  offerSDP: RTCSessionDescription['sdp']
): Promise<void | firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>> => {
  const timestamps = getTimestamps()
  const data = { ...timestamps, offerSDP }

  return firestore
    .collection('p2p')
    .doc('1')
    .set(data)
    .catch((e) => {
      console.error(e)
    })
}

export const updateP2P = (
  docId: string,
  answerSDP: RTCSessionDescription['sdp']
): Promise<void | firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>> => {
  const timestamps = getTimestamps()
  const data = { updatedAt: timestamps.updatedAt, answerSDP }

  return firestore
    .collection('p2p')
    .doc(docId)
    .update(data)
    .catch((e) => {
      console.error(e)
    })
}
