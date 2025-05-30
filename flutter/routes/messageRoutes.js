const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');
const isParticipantMiddleware = require('../middleware/isParticipantMiddleware');

router.post('/events/:id/messages', authMiddleware, isParticipantMiddleware, messageController.sendMessage);
router.get('/events/:id/messages', authMiddleware, isParticipantMiddleware, messageController.getMessages);

router.post('/notifications/send', authMiddleware, notificationController.sendNotification);

module.exports = router; 