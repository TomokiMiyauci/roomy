import * as functions from 'firebase-functions'

const { Nuxt } = require('nuxt')
const nuxt = new Nuxt({
  dev: false
})

export default functions
  .region('us-central1')
  .runWith({ memory: '2GB' })
  .https.onRequest(async (req, res) => {
    await nuxt.ready()
    return nuxt.render(req, res)
  })
