import { auth } from '@/plugins/firebase'

export const signOut = () => {
  return auth.signOut()
}
