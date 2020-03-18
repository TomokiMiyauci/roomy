type MessageKinds =
  | { kind: 'TEXT'; text: string }
  | { kind: 'AUDIO'; audioURL: string }

export type Message = {
  id?: string
} & MessageKinds
