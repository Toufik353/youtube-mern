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
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  publishedTime: { type: Date, default: Date.now },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          text: String,
      username: String,
      time: { type: Date, default: Date.now },
    //   likes: { type: Number, default: 0 },
    //   dislikes: { type: Number, default: 0 },
    },
  ],
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
