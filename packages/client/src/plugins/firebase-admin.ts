/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-var */

if (process.server) {
  var admin = require('firebase-admin')
  if (!admin.apps.length) {
    const serviceAccount = require('../../secret.json')
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.DATABASE_URL
    })
  }
}

export default admin
