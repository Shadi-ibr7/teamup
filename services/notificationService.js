const { db, auth } = require('../services/firebaseService');
const admin = require('firebase-admin');

exports.sendNotificationToEventParticipants = async (eventId, title, message, priority = 'high') => {
          // Récupérer les participants de l'événement
          const eventSnap = await db.collection('events').doc(eventId).get();
          if (!eventSnap.exists) throw new Error('Événement introuvable');
          const event = eventSnap.data();
          const participantUids = event.participants || [];
          if (participantUids.length === 0) throw new Error('Aucun participant à notifier');

          // Récupérer les tokens FCM de chaque participant
          const tokens = [];
          for (const uid of participantUids) {
                    const userSnap = await db.collection('users').doc(uid).get();
                    if (userSnap.exists && userSnap.data().fcmToken) {
                              tokens.push(userSnap.data().fcmToken);
                    }
          }
          if (tokens.length === 0) throw new Error('Aucun token FCM trouvé');

          // Envoyer la notification
          const payload = {
                    notification: {
                              title,
                              body: message,
                    },
                    android: { priority },
                    apns: { headers: { 'apns-priority': priority === 'high' ? '10' : '5' } },
          };
          const response = await admin.messaging().sendToDevice(tokens, payload);
          return response;
}; 