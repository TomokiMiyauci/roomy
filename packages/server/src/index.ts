import * as functions from 'firebase-functions'
// import nuxtServer from './nuxt-server'
import { RecentMessage, Message } from "../../share/core";
// exports.nuxtServer = functions
//   .runWith({ memory: '2GB' })
//   .https.onRequest(nuxtServer)


exports.hello = functions.runWith({memory: '2GB'}).firestore.document('rooms/{roomId}/messages/{messageId}').onCreate(async (snapshot)=> {
  // console.log(snapshot, context);

  const { size } = await snapshot.ref.parent.get()
  const data  = snapshot.data() as Message | undefined

  if( !data || !snapshot.ref.parent.parent) return

  if(!data.author.isAnonymous) {
    return
  }

  const {kind, createdAt, updatedAt } = data
  const shortMessage = data.kind === 'TEXT'? data.text: 'Something posted'


  const recentMessage: RecentMessage ={
    createdAt,
    updatedAt,
    kind,
    shortMessage,
    author: {
      isAnonymous: true
    }
  }

  return snapshot.ref.parent.parent.update({
    messageCount: size,
    recent: recentMessage
  })

})
