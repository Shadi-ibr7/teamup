const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

router.get('/admin/events', authMiddleware, isAdminMiddleware, adminController.getPendingEvents);
router.patch('/admin/events/:id', authMiddleware, isAdminMiddleware, adminController.updateEventStatus);

module.exports = router; 