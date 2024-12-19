const mongoose = require('mongoose');

// Comment Schema for storing user comments
const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  text: { type: String, required: true }
});

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  avatar: { type: String },
  channel: { type: String },
  description: { type: String },
  views: { type: Number, default: 0 },
  publishedTime: { type: Date, default: Date.now },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          text: String,
      username: String,
      time: { type: Date, default: Date.now },
    },
    ],
    // channels: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },

});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
