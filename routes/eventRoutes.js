const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/events', authMiddleware, eventController.createEvent);
router.post('/events/:id/join', authMiddleware, eventController.joinEvent);

module.exports = router; 