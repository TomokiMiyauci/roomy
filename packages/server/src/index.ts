import * as functions from 'firebase-functions'
// import nuxtServer from './nuxt-server'
import { RecentMessage, Message, ShortMessage } from "~types/core";
// exports.nuxtServer = functions
//   .runWith({ memory: '2GB' })
//   .https.onRequest(nuxtServer)

exports.hello = functions.runWith({memory: '2GB'}).region('asia-northeast1').firestore.document('rooms/{roomId}/messages/{messageId}').onCreate(async (snapshot)=> {
  // console.log(snapshot, context);

  const { size } = await snapshot.ref.parent.get()
  const data  = snapshot.data() as Message | undefined

  if( !data || !snapshot.ref.parent.parent) return


  const {kind, createdAt, updatedAt,author } = data

  let shortMessage: ShortMessage = 'No messages'

  switch(data.kind){
    case 'TEXT':{
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

  const recentMessage: RecentMessage ={
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
