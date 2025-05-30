const { db } = require('../services/firebaseService');

exports.getPendingEvents = async () => {
          const snap = await db.collection('events').where('status', '==', 'pending').get();
          return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.updateEventStatus = async (eventId, status) => {
          const allowed = ['validated', 'rejected', 'archived'];
          if (!allowed.includes(status)) throw new Error('Statut non autorisé');
          await db.collection('events').doc(eventId).update({ status });
}; 