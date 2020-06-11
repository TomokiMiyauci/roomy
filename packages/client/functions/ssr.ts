import * as functions from 'firebase-functions'

const { Nuxt } = require('nuxt')
const nuxt = new Nuxt({
  dev: false
})

export default functions
  .region('us-central1')
  .runWith({ memory: '2GB' })
  .https.onRequest(async (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    await nuxt.ready()
    return nuxt.render(req, res)
  })
