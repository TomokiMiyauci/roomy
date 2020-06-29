import { onUnmounted, Ref, ref } from '@vue/composition-api'

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
  errorHandler?: (err: Error) => void
): { dataRef: Ref<(T & Id) | null>; asyncState: Promise<void> }
export function useFirestore<T extends firebase.firestore.DocumentData>(
  docRef: firebase.firestore.Query,
  errorHandler?: (err: Error) => void
): { dataRef: Ref<(T & Id)[]>; asyncState: Promise<void> }
export function useFirestore<T extends firebase.firestore.DocumentData>(
  docRef: FirebaseDocRef<T>,
  errorHandler = (err: Error) => {
    console.log(err)
  }
) {
  const close = ref<() => void>(() => {})

  onUnmounted(() => {
    close.value()
  })

  if (docRef instanceof firebase.firestore.DocumentReference) {
    const dataRef = ref<T | undefined>()

    const asyncState = (): Promise<void> => {
      return new Promise((resolve) => {
        close.value = docRef.onSnapshot((snapshot) => {
          dataRef.value = getData(snapshot) || undefined
          resolve()
        }, errorHandler)
      })
    }

    return { asyncState: asyncState(), dataRef }
  } else {
    const dataRef = ref<T[]>([])
    const asyncSnapshot = (): Promise<void> => {
      return new Promise((resolve) => {
        close.value = docRef.onSnapshot((snapshot) => {
          dataRef.value = snapshot.docs.map(getData).filter(isDef)

          resolve()
        }, errorHandler)
      })
    }

    return { asyncState: asyncSnapshot(), dataRef }
  }
}
