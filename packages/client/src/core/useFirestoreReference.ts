import { computed } from '@vue/composition-api'

import { firestore } from '@/plugins/firebase'
import { reference, user } from '@/store'
import { Profile, User } from '~types/core'

export const messageReference = () => {
  const collectionRef = computed(() =>
    firestore
      .collection('public-rooms')
      .doc(reference.roomId)
      .collection('messages')
  )

  return { collectionRef }
}

export const roomReference = () => {
  const collectionRef = computed(() => firestore.collection('public-rooms'))
  const documentRef = computed(() => collectionRef.value.doc(reference.roomId))

  return { collectionRef, documentRef }
}

export const publicRoomRef = () => {
  const collectionRef = computed(() => firestore.collection('public-rooms'))
  const documentRef = computed(() => collectionRef.value.doc(reference.roomId))

  return { collectionRef, documentRef }
}

export const publicRoomMessageRef = () => {
  const collectionRef = computed(() =>
    publicRoomRef().documentRef.value.collection('messages')
  )

  const documentRef = computed(() => collectionRef.value)

  return { collectionRef, documentRef }
}

export const profileRef = () => {
  const collectionRef = computed(() => firestore.collection('profiles'))

  const documentRef = computed(
    () =>
      collectionRef.value.doc(user.id) as firebase.firestore.DocumentReference<
        Profile
      >
  )

  return { collectionRef, documentRef }
}

export const userRef = () => {
  const collectionRef = computed(() => firestore.collection('users'))

  const documentRef = computed(
    () =>
      collectionRef.value.doc(user.id) as firebase.firestore.DocumentReference<
        User
      >
  )

  return { collectionRef, documentRef }
}
