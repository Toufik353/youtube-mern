const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");


const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  channelBanner: { type: String, required: true },
  subscribers: { type: Number, default: 0 },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    channelId: { type: String, unique: true, default: uuidv4 },

});

module.exports = mongoose.model('Channel', channelSchema);
