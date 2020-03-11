import { ref, onUnmounted, Ref } from '@vue/composition-api'
import firebase from '@/plugins/firebase'

const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

export type FirebaseDocRef<T> =
  | firebase.firestore.Query<T>
  | firebase.firestore.DocumentReference<T>

const getData = <T>(
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
): Ref<T | null>
export function useFirestore<T extends firebase.firestore.DocumentData>(
  docRef: firebase.firestore.Query<T>,
  errorHandler?: (err: Error) => void
): Ref<T[]>
export function useFirestore<T extends firebase.firestore.DocumentData>(
  docRef: FirebaseDocRef<T>,
  errorHandler = (err: Error) => {
    console.log(err)
  }
) {
  if (docRef instanceof firebase.firestore.DocumentReference) {
    const data = ref<T | null>(null)

    const close = docRef.onSnapshot((snapshot) => {
      console.log(snapshot)

      data.value = getData(snapshot) || null
    }, errorHandler)

    onUnmounted(() => {
      close()
    })

    return data
  } else {
    const data = ref<T[]>([])

    const close = docRef.onSnapshot((snapshot) => {
      data.value = snapshot.docs.map(getData).filter(isDef)
    }, errorHandler)

    onUnmounted(() => {
      close()
    })

    return data
  }
}
