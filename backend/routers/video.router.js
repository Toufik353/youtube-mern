const express = require('express');
const { getAllVideos, getVideoById,getComments,addComment,deleteComment,likeVideo,dislikeVideo,editComment, fetchLikes} = require('../controllers/video.cotroller.js');
const {authMiddleware} = require("../middleware/authMiddleware.js")
const router = express.Router();

router.get('/videos', getAllVideos);

router.get('/videos/:_id', getVideoById);

// GET /videos/:id/comments - Fetch comments for a video
router.get("/:_id/comments", getComments);

// POST /videos/:id/comments - Add a comment to a video
router.post("/videos/:_id",authMiddleware, addComment);

// DELETE /videos/:id/comments/:commentId - Delete a comment
router.delete("/videos/:_id", authMiddleware, deleteComment);

// Edit comment
router.put('/videos/:id', authMiddleware, editComment);


// Like video
router.post('/videos/:_id/like',authMiddleware, likeVideo);

// Dislike video
router.post('/videos/:_id/dislike', authMiddleware, dislikeVideo);

// fetch likes
router.get('/videos/:_id/likes',authMiddleware, fetchLikes);



module.exports = router;
