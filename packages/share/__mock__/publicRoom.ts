import { timestamp, roomName } from '../__mock__'
import { PublicRoomMerged } from '../core'

export const publicRooms: PublicRoomMerged[] = [
  {
    name: roomName,
    photoURL: '',
    messageCount: 0,
    description: '',
    recent: {
      author: {
        isAnonymous: true
      },
      shortMessage: 'No message',
      kind: 'TEXT',
      updatedAt: timestamp
    },
    tags: ['Public', 'Open'],
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: roomName,
    photoURL: '',
    messageCount: 2,
    description: '',
    recent: {
      author: {
        isAnonymous: true
      },
      shortMessage: 'No message',
      kind: 'TEXT',
      updatedAt: timestamp
    },
    tags: ['Public', 'Open'],
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
