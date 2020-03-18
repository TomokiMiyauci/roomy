type MessageKinds =
  | { kind: 'TEXT'; text: string }
  | { kind: 'AUDIO'; audioURL: string }

export type MessageSet = MessageKinds

export type Public = FirestoreFieldValue & MessageSet

export type FirestoreFieldValue = {
  id?: string
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}
