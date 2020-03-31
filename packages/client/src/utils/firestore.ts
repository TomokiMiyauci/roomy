import firebase from '@/plugins/firebase'

type Sometime = 'createdAt' | 'updatedAt'

export const getTimestamps = () => {
  return { ...getTimestamp('createdAt'), ...getTimestamp('updatedAt') }
}

export const getTimestamp = (sometime: Sometime) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()

  return { [sometime]: timestamp }
}
