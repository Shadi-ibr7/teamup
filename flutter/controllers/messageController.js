const { db } = require('../services/firebaseService');

exports.sendMessage = async (req, res) => {
          const eventId = req.params.id;
          const userId = req.user.uid;
          const { text } = req.body;
          if (!text || !text.trim()) {
                    return res.status(400).json({ error: 'Message vide' });
          }
          try {
                    const messageRef = await db.collection('messages').doc(eventId).collection('messages').add({
                              text,
                              userId,
                              timestamp: new Date(),
                    });
                    res.status(201).json({ messageId: messageRef.id });
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
};

exports.getMessages = async (req, res) => {
          const eventId = req.params.id;
          try {
                    const snapshot = await db.collection('messages').doc(eventId).collection('messages').orderBy('timestamp').get();
                    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    res.status(200).json(messages);
          } catch (error) {
                    res.status(400).json({ error: error.message });
          }
}; 