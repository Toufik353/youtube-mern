const Video = require('../models/video.model.js');

// Get all videos
const getAllVideos = async (req, res) => {
  try {
      const videos = await Video.find();
    //   console.log("videos",videos)
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Get a single video by ID
const getVideoById = async (req, res) => {
    const { _id } = req.params;

    // console.log("videoId testing",_id)
  try {
    const video = await Video.findOne({ _id });
      if (!video) return res.status(404).json({ message: 'Video not found' });
    //   console.log("video found", video)
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
};

// Fetch comments for a video
const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video.comments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a comment to a video
const addComment = async (req, res) => {
  console.log("Testing addComment");

  try {
      const { _id, userId, username, text } = req.body;
      
      console.log("testing data from add comment", _id, userId, username,)

    if (!username || !text || !userId) {
      return res.status(400).json({ message: "Username, userId, and content are required" });
    }

    // Find the video by its _id
    const video = await Video.findById(_id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Create a new comment object
    const newComment = { userId, username, text };

    // Push the new comment to the video's comments array
    video.comments.push(newComment);
    
    // Save the updated video
    await video.save();

    // Respond with the new comment
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Delete a comment from a video
const deleteComment = async (req, res) => {
    try {
      console.log("req.user from middle",req.user)
    const { _id, commentId } = req.body; // Extract videoId (_id) and commentId from request body
      const userId = req.user.user; // Assuming userId is passed in the request (could be from a token or session)
    //   console.log("userId test",userId)

    // Find the video by _id
    const video = await Video.findById(_id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find the comment in the video's comments array
    const commentIndex = video.comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    const comment = video.comments[commentIndex];
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    // Remove the comment from the array
    video.comments.splice(commentIndex, 1);
    await video.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Edit comment
const editComment = async (req, res) => {
  try {
    const { _id, commentId, newText } = req.body; // Extract videoId (_id), commentId, and new text for the comment
    const userId = req.user.user; // Assuming userId is passed in the request (could be from a token or session)

      console.log("testing eidt comment", _id,commentId,newText)
    const video = await Video.findById(_id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const commentIndex = video.comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const comment = video.comments[commentIndex];
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to edit this comment" });
    }

    comment.text = newText;
    await video.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Like a video
const likeVideo = async (req, res) => {
  const { userId } = req.body;
    const videoId = req.params._id;
    
    console.log("test from controller ", userId, videoId)

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (video.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this video' });
    }

    video.likes.push(userId); // Add user ID to likes
    if (video.dislikes.includes(userId)) {
      video.dislikes.pull(userId); // Remove user ID from dislikes
    }

    await video.save();
    res.status(200).json(video); // Return updated video data
  } catch (err) {
    res.status(500).json({ message: 'Error liking video', error: err });
  }
};

// Dislike a video
const dislikeVideo = async (req, res) => {
  const { userId } = req.body;
  const videoId = req.params._id;

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (video.dislikes.includes(userId)) {
      return res.status(400).json({ message: 'You have already disliked this video' });
    }

    video.dislikes.push(userId); // Add user ID to dislikes
    if (video.likes.includes(userId)) {
      video.likes.pull(userId); // Remove user ID from likes
    }

    await video.save();
    res.status(200).json(video); // Return updated video data
  } catch (err) {
    res.status(500).json({ message: 'Error disliking video', error: err });
  }
};



module.exports = {
  getAllVideos,
    getVideoById,
    getComments,
    addComment,
    deleteComment,
    editComment,
    likeVideo,
    dislikeVideo
  
};
