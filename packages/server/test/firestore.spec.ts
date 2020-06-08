import * as firebase from '@firebase/testing'
import fs from 'fs'
import { publicRoom } from '~mock/index'

const PROJECT_ID = 'test'
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

describe('firestore', () => {
  //実行前に一度だけ実行（初期化）
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: PROJECT_ID,
      rules: fs.readFileSync('../../firebase/firestore.rules', 'utf8')
    })
  })

  //ブロックが終わるたび実行
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID }) //データリセット
  })

  //終わった後に一度だけ実行
  afterAll(async () => {
    await Promise.all(
      firebase.apps().map((app) => app.delete()) //生成したアプリを削除
    )
  })

  //条件(projectIdとauth情報）をの指定を関数化
  //auth : {uid:'alice'}
  //auth : {uid:'alice', admin:true} admin
  //auth : null 未認証
  function authedApp(auth: {}): firebase.firestore.Firestore {
    return firebase
      .initializeTestApp({
        projectId: PROJECT_ID,
        auth: auth
      })
      .firestore()
  }

  describe('public-rooms', () => {
    it('should read when authed', async () => {
      const firestore = authedApp({ uid: 'admin', name: 'admin' })
      const publicRooms = firestore.collection('public-rooms')

      await firebase.assertSucceeds(publicRooms.get())
    })

    it('should write when authed', async () => {
      const firestore = authedApp({
        uid: 'authenticated',
        name: 'authenticated'
      })
      const publicRooms = firestore.collection('public-rooms')

      await firebase.assertSucceeds(
        publicRooms.add({
          ...publicRoom,
          createdAt: timestamp,
          updatedAt: timestamp,
          recent: {
            updatedAt: timestamp
          }
        })
      )
    })

    it('should not get', async () => {
      const firestore = authedApp({
        uid: 'authenticated',
        name: 'authenticated'
      })

      const publicRooms = firestore.collection('public-rooms').doc('something')
      await firebase.assertFails(publicRooms.get())
    })
  })
})
