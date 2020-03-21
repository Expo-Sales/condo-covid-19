import admin from 'firebase-admin'
import serviceAccount from './certs/service-account'

export default () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount()),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  }

  return admin
}
