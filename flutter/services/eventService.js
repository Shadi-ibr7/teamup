const { db } = require('../services/firebaseService');

exports.joinEvent = async (eventId, userId) => {
          const eventRef = db.collection('events').doc(eventId);
          const eventSnap = await eventRef.get();
          if (!eventSnap.exists) {
                    throw new Error('Événement introuvable');
          }
          const event = eventSnap.data();
          if (event.participants && event.participants.includes(userId)) {
                    throw new Error('Déjà inscrit à cet événement');
          }
          if (event.currentParticipants && event.currentParticipants >= event.spots) {
                    throw new Error('Événement complet');
          }
          // Ajoute l'utilisateur et incrémente le compteur
          const newCount = (event.currentParticipants || 0) + 1;
          await eventRef.update({
                    participants: [...(event.participants || []), userId],
                    currentParticipants: newCount,
          });
};

function validateEventData(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string' || data.title.length < 3) errors.push('Titre invalide');
  if (!data.description || typeof data.description !== 'string' || data.description.length < 5) errors.push('Description invalide');
  if (!data.sport || typeof data.sport !== 'string') errors.push('Sport invalide');
  if (!data.location || typeof data.location !== 'object' || !data.location.lat || !data.location.lng || !data.location.name) errors.push('Localisation invalide');
  if (!data.date || isNaN(Date.parse(data.date))) errors.push('Date invalide');
  if (!data.time || !/^\d{2}:\d{2}$/.test(data.time)) errors.push('Heure invalide');
  if (!data.level || typeof data.level !== 'string') errors.push('Niveau invalide');
  if (!data.maxParticipants || typeof data.maxParticipants !== 'number' || data.maxParticipants < 2) errors.push('Nombre de places invalide');
  return errors;
}

exports.createEventInFirestore = async (data) => {
  const errors = validateEventData(data);
  if (errors.length) throw new Error(errors.join(', '));
  const event = {
    ...data,
    createdAt: new Date(),
    participants: [],
    status: 'pending',
  };
  const ref = await db.collection('events').add(event);
  return ref.id;
}; 