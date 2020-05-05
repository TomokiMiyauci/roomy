import * as functions from 'firebase-functions'

const { Nuxt } = require('nuxt')
const nuxt = new Nuxt({
  dev: false
})

exports.ssr = functions
  .runWith({ memory: '2GB' })
  .https.onRequest(async (req, res) => {
    await nuxt.ready()
    return nuxt.render(req, res)
  })
