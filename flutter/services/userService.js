const { db, auth } = require('../services/firebaseService');

exports.deleteUserAccount = async (uid) => {
          // Supprimer le document utilisateur
          await db.collection('users').doc(uid).delete();

          // Supprimer tous les événements créés par l'utilisateur
          const createdEventsSnap = await db.collection('events').where('organizerId', '==', uid).get();
          const batch = db.batch();
          createdEventsSnap.forEach(doc => batch.delete(doc.ref));

          // Retirer l'utilisateur des participations dans d'autres événements
          const joinedEventsSnap = await db.collection('events').where('participants', 'array-contains', uid).get();
          joinedEventsSnap.forEach(doc => {
                    const ref = doc.ref;
                    const participants = doc.data().participants.filter(id => id !== uid);
                    batch.update(ref, { participants });
          });

          await batch.commit();

          // Supprimer le compte Firebase Auth
          await auth.deleteUser(uid);
};

exports.updateUserProfile = async (uid, { fullName, preferredSport, level }) => {
  // Mettre à jour Firestore
  await db.collection('users').doc(uid).update({
    ...(fullName && { fullName }),
    ...(preferredSport && { preferredSport }),
    ...(level && { level }),
  });
  // Mettre à jour displayName dans Auth
  if (fullName) {
    await auth.updateUser(uid, { displayName: fullName });
  }
}; 