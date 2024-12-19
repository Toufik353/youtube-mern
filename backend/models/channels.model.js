const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  channelName: { 
    type: String, 
    required: true 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  description: { 
    type: String 
  },
  channelBanner: { 
    type: String 
  },
  subscribers: { 
    type: Number, 
    default: 0 
  },
  videos: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Video' 
  }],
}, { timestamps: true });

module.exports = mongoose.model('Channel', channelSchema);
