import { tagRef } from '@/core/useFirestoreReference'

export const getTags = (keyword: string) => {
  const { collectionRef } = tagRef()

  return collectionRef.value
    .orderBy('value')
    .startAt(keyword)
    .endAt(`${keyword}\uF8FF`)
    .limit(3)
    .get()
}
