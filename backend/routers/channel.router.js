const express = require('express');
const router = express.Router();
const { createChannel, updateChannel, getChannelById,getChannelData } = require('../controllers/channel.controller.js');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/channel', authMiddleware, createChannel);

// Get channels
router.get('/channel/:channelId', authMiddleware, getChannelById);


module.exports = router;
