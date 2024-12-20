const express = require('express');
const router = express.Router();
const { createChannel, updateChannel, getChannelById,getChannelData } = require('../controllers/channel.controller.js');
const { authMiddleware } = require('../middleware/authMiddleware'); // Middleware to verify user authentication

router.post('/channel', authMiddleware, createChannel);

// Get channels
router.get('/channel/:channelId', authMiddleware, getChannelById);


module.exports = router;
