const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users/:uid/stats', userController.getUserStats);
router.delete('/users/delete-account', authMiddleware, userController.deleteUserAccount);
router.patch('/users/me', authMiddleware, userController.updateUserProfile);

module.exports = router; 