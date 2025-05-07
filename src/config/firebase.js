const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json"); // Đường dẫn đến file JSON bạn tải từ Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db, admin };
