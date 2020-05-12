import { computed } from '@vue/composition-api'

import { firestore } from '@/plugins/firebase'
import { reference } from '@/store'

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
