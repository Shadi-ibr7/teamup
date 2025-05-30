const { db } = require('../services/firebaseService');

const isParticipantMiddleware = async (req, res, next) => {
          const eventId = req.params.id;
          const userId = req.user.uid;
          const eventRef = db.collection('events').doc(eventId);
          const eventSnap = await eventRef.get();
          if (!eventSnap.exists) {
                    return res.status(404).json({ error: 'Événement introuvable' });
          }
          const event = eventSnap.data();
          if (!event.participants || !event.participants.includes(userId)) {
                    return res.status(403).json({ error: 'Accès réservé aux participants' });
          }
          next();
};

module.exports = isParticipantMiddleware; 