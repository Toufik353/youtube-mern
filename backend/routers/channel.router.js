const express = require('express');
const router = express.Router();
const { createChannel, updateChannel, deleteChannel,getChannelById } = require('../controllers/channel.controller.js');
const { authMiddleware } = require('../middleware/authMiddleware'); // Middleware to verify user authentication

router.post('/channel', authMiddleware, createChannel);

// Get Channel Details
router.get('/channel/:channelId',authMiddleware, getChannelById);

// Get Videos
// router.get('/videos', authMiddleware, getVideosByChannel);

// Get Playlists
// router.get('/playlists', authMiddleware, getPlaylistsByChannel);


module.exports = router;
