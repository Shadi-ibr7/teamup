const { db } = require('../services/firebaseService');
const eventService = require('../services/eventService');
const fs = require('fs');
const path = require('path');

exports.createEvent = async (req, res) => {
          const organizerId = req.user.uid;
          const {
                    title, description, sport, location, date, time, level, maxParticipants
          } = req.body;
          try {
                    const eventId = await eventService.createEventInFirestore({
                              title, description, sport, location, date, time, level, maxParticipants, organizerId
                    });
                    // Log l'événement
                    const logMsg = `${new Date().toISOString()} - Event created: ${eventId} by ${organizerId}\n`;
                    const logPath = path.join(__dirname, '../logs/events.log');
                    fs.mkdirSync(path.dirname(logPath), { recursive: true });
                    fs.appendFileSync(logPath, logMsg);
                    res.status(201).json({ eventId, message: 'Événement créé et en attente de validation.' });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
};

exports.joinEvent = async (req, res) => {
          const eventId = req.params.id;
          const userId = req.user.uid;
          try {
                    await eventService.joinEvent(eventId, userId);
                    res.status(200).json({ message: 'Inscription réussie' });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
}; 