const admin = require('../config/firebase');
require('dotenv').config();

if (!admin.apps.length) {
          admin.initializeApp({
                    credential: admin.credential.cert({
                              projectId: process.env.FIREBASE_PROJECT_ID,
                              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                              privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    }),
          });
}

const auth = admin.auth();
const db = admin.firestore();

exports.createUser = async ({ email, password, fullName }) => {
  return admin.auth().createUser({
    email,
    password,
    displayName: fullName,
  });
};

exports.verifyIdToken = async (idToken) => {
  return admin.auth().verifyIdToken(idToken);
};

exports.createUserDoc = async (uid, { fullName, email, preferredSport, level }) => {
  return db.collection('users').doc(uid).set({
    fullName,
    email,
    preferredSport,
    level,
    createdAt: new Date(),
    role: 'user',
  });
};

module.exports = { auth, db }; 