import { roomReference } from '@/core/useFirestoreReference'
import { getUser } from '@/repositories/public'
import { user } from '@/store'
import { getTimestamp, getTimestamps } from '@/utils/firestore'
export const createRoom = () => {
  const { collectionRef } = roomReference()

  return collectionRef.value.add({
    recent: {
      message: 'No messages',
      isAnonymous: true,
      ...getTimestamps()
    },
    name: 'New Room',
    ...getTimestamps()
  })
}

export const updateRoom = () => {
  const u = getUser(user.id)
  const { documentRef } = roomReference()

  return documentRef.value.update({
    ...u,
    ...getTimestamp('updatedAt')
  })
}

export const updateRecent = (message: string) => {
  const { documentRef } = roomReference()

  return documentRef.value.update({
    recent: {
      message,
      ...getUser(user.id),
      ...getTimestamp('updatedAt')
    }
  })
}
