import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { RecentMessage, Message, ShortMessage } from '~types/core'

admin.initializeApp()
const firestore = admin.firestore()

type Profile = {
  displayName: firebase.User['displayName']
  photoURL: firebase.User['photoURL']
}

export const onCreateUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    await admin.auth().setCustomUserClaims(user.uid, {
      suspend: false
    })

    const { displayName: newDisplayName, photoURL: newPhotoURL } = user
    const displayName = newDisplayName ? newDisplayName : null
    const photoURL = newPhotoURL ? newPhotoURL : null
    const profile: Profile = {
      displayName,
      photoURL
    }

    await firestore
      .collection('profiles')
      .doc(user.uid)
      .set(profile)
  })

exports.hello = functions
  .runWith({ memory: '2GB' })
  .region('asia-northeast1')
  .firestore.document('rooms/{roomId}/messages/{messageId}')
  .onCreate(async (snapshot) => {
    // console.log(snapshot, context);

    const { size } = await snapshot.ref.parent.get()
    const data = snapshot.data() as Message | undefined

    if (!data || !snapshot.ref.parent.parent) return

    const { kind, createdAt, updatedAt, author } = data

    let shortMessage: ShortMessage = 'No messages'

    switch (data.kind) {
      case 'TEXT': {
        shortMessage = data.text
        break
      }

      case 'AUDIO': {
        shortMessage = 'Audio posted'
        break
      }

      case 'IMAGE': {
        shortMessage = 'Image posted'
        break
      }
    }

    const recentMessage: RecentMessage = {
      createdAt,
      updatedAt,
      kind,
      shortMessage,
      author
    }

    return snapshot.ref.parent.parent.update({
      messageCount: size,
      recent: recentMessage
    })
  })
