const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json"); // Đường dẫn đến file JSON bạn tải từ Firebase Console
const { configEnv } = require("../config/config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: configEnv.STORAGE_BUCKET,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, admin, bucket };
