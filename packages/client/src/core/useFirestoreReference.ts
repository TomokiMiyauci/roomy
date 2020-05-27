import { computed } from '@vue/composition-api'

import firebase, { firestore } from '@/plugins/firebase'
import { reference, user } from '@/store'
import { Profile, PublicRoom, User, ViewHistory } from '~types/core'

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
  const collectionRef = computed(
    () =>
      firestore.collection(
        'public-rooms'
      ) as firebase.firestore.CollectionReference<PublicRoom>
  )

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
  const collectionRef = computed(
    () =>
      firestore.collection(
        'profiles'
      ) as firebase.firestore.CollectionReference<Profile>
  )

  const documentRef = computed(() => collectionRef.value.doc(user.id))

  return { collectionRef, documentRef }
}

export const userRef = () => {
  const collectionRef = computed(
    () =>
      firestore.collection('users') as firebase.firestore.CollectionReference<
        User
      >
  )

  const documentRef = computed(() => collectionRef.value.doc(user.id))

  return { collectionRef, documentRef }
}

export const viewHistoryRef = () => {
  const { documentRef } = userRef()

  const collectionRef = computed(
    () =>
      documentRef.value.collection(
        'view-histories'
      ) as firebase.firestore.CollectionReference<ViewHistory>
  )

  return { collectionRef }
}

export const tagRef = () => {
  const collectionRef = computed(() => firestore.collection('tags'))

  return { collectionRef }
}
