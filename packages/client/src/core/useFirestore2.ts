import { onBeforeMount, onUnmounted, Ref, ref } from '@vue/composition-api'

import firebase from '@/plugins/firebase'
import { Id } from '~types/core'

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

export type FirebaseDocRef<T> =
  | firebase.firestore.Query<T>
  | firebase.firestore.DocumentReference<T>

export const getData = <T>(
  docRef:
    | firebase.firestore.DocumentSnapshot<T>
    | firebase.firestore.QueryDocumentSnapshot<T>
) => {
  const data = docRef.data()

  if (data) {
    Object.defineProperty(data, 'id', {
      value: docRef.id.toString(),
      writable: false
    })
  }

  return data
}

export function useFirestore<T extends firebase.firestore.DocumentData>(
  docRef: firebase.firestore.DocumentReference<T>,
  autoSync?: boolean,
  errorHandler?: (err: Error) => void
): { data: Ref<(T & Id) | null>; asyncSnapshot: () => Promise<void> }
export function useFirestore<T extends firebase.firestore.DocumentData>(
  docRef: firebase.firestore.Query,
  autoSync?: boolean,
  errorHandler?: (err: Error) => void
): { data: Ref<(T & Id)[]>; asyncSnapshot: () => Promise<void> }
export function useFirestore<T extends firebase.firestore.DocumentData>(
  docRef: FirebaseDocRef<T>,
  autoSync = true,
  errorHandler = (err: Error) => {
    console.log(err)
  }
) {
  const close = ref<() => void>(() => {})
  const asyncSnapshot = ref<() => Promise<void>>(() => Promise.resolve())

  onBeforeMount(async () => {
    if (!autoSync) return
    await asyncSnapshot.value()
  })

  onUnmounted(() => {
    close.value()
  })

  if (docRef instanceof firebase.firestore.DocumentReference) {
    const data = ref<T | null>(null)

    asyncSnapshot.value = (): Promise<void> => {
      return new Promise((resolve) => {
        close.value = docRef.onSnapshot((snapshot) => {
          data.value = getData(snapshot) || null
          resolve()
        }, errorHandler)
      })
    }

    return { data, asyncSnapshot: asyncSnapshot.value }
  } else {
    const data = ref<T[]>([])

    asyncSnapshot.value = (): Promise<void> => {
      return new Promise((resolve) => {
        close.value = docRef.onSnapshot((snapshot) => {
          data.value = snapshot.docs.map(getData).filter(isDef)
          resolve()
        }, errorHandler)
      })
    }

    return { data, asyncSnapshot: asyncSnapshot.value }
  }
}
