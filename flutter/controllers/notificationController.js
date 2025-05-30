const notificationService = require('../services/notificationService');

exports.sendNotification = async (req, res) => {
          const { eventId, message, title, priority } = req.body;
          if (!eventId || !message || !title) {
                    return res.status(400).json({ error: 'eventId, title et message requis' });
          }
          try {
                    const response = await notificationService.sendNotificationToEventParticipants(
                              eventId,
                              title,
                              message,
                              priority || 'high'
                    );
                    res.status(200).json({ success: true, response });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
}; 