import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import styles from "./VideoPlayer.module.css";

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userLikes, setUserLikes] = useState({ liked: false, disliked: false });
  const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [likes,setLikes] = useState(0)

  const { _id } = useParams();

  useEffect(() => {
    fetchVideoById();
      fetchComments();
      fetchLikes()
  }, []);

  function timeSince(dateString) {
    const now = new Date();
    const pastDate = new Date(dateString);
    const differenceInMilliseconds = now - pastDate;

    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    } else if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      return `${minutes} minute(s) ago`;
    } else {
      return `${seconds} second(s) ago`;
    }
  }

  const fetchVideoById = async () => {
    try {
      const response = await fetch(`http://localhost:5005/videos/${_id}`);
      const data = await response.json();
      setVideo(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5005/videos/${_id}`);
      const data = await response.json();
      setComments(Array.isArray(data.comments) ? data.comments : []);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const username = JSON.parse(localStorage.getItem("user")).username;
    const token = localStorage.getItem("authToken");

    if (newComment.trim() === "") return;

    try {
      const response = await fetch(`http://localhost:5005/videos/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id, userId, text: newComment, username }),
      });
      const data = await response.json();
      setComments((prev) => [...prev, data]);
      fetchComments();
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`http://localhost:5005/videos/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id, commentId }),
      });
      const data = await response.json();
      fetchComments();
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.error(err);
    }
  };
    
    const fetchLikes = async () => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:5005/videos/${_id}/likes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        const data = await response.json();
        console.log("fetch likes", data)
        setLikes(data);
    };
    

  const handleLike = async () => {
    if (userLikes.liked) return;

    const token = localStorage.getItem("authToken");
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      console.log("from video player", userId)

    try {
      const response = await fetch(`http://localhost:5005/videos/${_id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
        const data = await response.json();
        fetchLikes()
      setUserLikes({ liked: true, disliked: userLikes.disliked });
      setVideo((prevVideo) => ({
        ...prevVideo,
        likes: data.likes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (userLikes.disliked) return;

    const token = localStorage.getItem("authToken");
      const userId = JSON.parse(localStorage.getItem("user"))._id;

    try {
      const response = await fetch(`http://localhost:5005/videos/${_id}/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
        setUserLikes({ liked: userLikes.liked, disliked: true });
                fetchLikes()

      setVideo((prevVideo) => ({
        ...prevVideo,
        likes: data.likes,
        dislikes: data.dislikes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditingComment = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditText(text);
  };

  const handleEditComment = async () => {
    const token = localStorage.getItem("authToken");
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    if (editText.trim() === "") return;

    try {
      const response = await fetch(`http://localhost:5005/videos/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id, commentId: editingCommentId, newText: editText }),
      });
      const data = await response.json();
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === editingCommentId ? { ...comment, text: data.text } : comment
        )
      );
      setEditingCommentId(null);
      setEditText("");
      fetchComments(); // Refresh the comments to reflect the change
    } catch (err) {
      console.error(err);
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className={styles.videoPlayerContainer}>
      <div className={styles.mainSection}>
        <div className={styles.mainVideoSection}>
          <iframe
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoIframe}
          ></iframe>
          <h1 className={styles.videoTitle}>{video.title}</h1>
          <div className={styles.channelInfo}>
            <img src={video.avatar} alt="Channel Avatar" className={styles.channelAvatar} />
            <div>
              <h3>{video.channel}</h3>
              <p>{video.views} • {video.publishedTime}</p>
            </div>
          </div>
          <p className={styles.videoDescription}>{video.description}</p>
          <div className={styles.likeDislikeButtons}>
            <button className={styles.likeButton} onClick={handleLike} disabled={userLikes.liked}>
              <FaThumbsUp /> {(likes.likes) || 0}
            </button>
            <button className={styles.dislikeButton} onClick={handleDislike} disabled={userLikes.disliked}>
              <FaThumbsDown /> {likes.dislikes || 0}
            </button>
          </div>
        </div>

        {/* Side-by-side layout */}
        <div className={styles.sideBySideSection}>
          <div className={styles.commentsSection}>
            <h2>Comments</h2>
            <div className={styles.addComment}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className={styles.commentInput}
              />
              <button onClick={addComment} className={styles.commentButton}>
                Post
              </button>
            </div>

            <div className={styles.commentsList}>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className={styles.commentContainer}>
                    <div key={comment._id} className={styles.commentText}>
                      <p>
                        <strong>{comment.username}</strong> • {timeSince(comment.time)}
                      </p>
                      {editingCommentId === comment._id ? (
                        <div className={styles.editComment}>
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className={styles.commentInput}
                          />
                          <button onClick={handleEditComment} className={styles.editButton}>
                            Save
                          </button>
                        </div>
                      ) : (
                        <p>{comment.text}</p>
                      )}
                    </div>
                    <div className={styles.commentActions}>
                      <button
                        onClick={() => startEditingComment(comment._id, comment.text)}
                        className={styles.editButton}
                        disabled={JSON.parse(localStorage.getItem("user"))._id !== comment.userId}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteComment(comment._id)}
                        className={styles.deleteButton}
                        disabled={JSON.parse(localStorage.getItem("user"))._id !== comment.userId}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments available</p>
              )}
            </div>
          </div>

          <div className={styles.videoListSection}>
            <h3>Other Videos</h3>
            <div className={styles.videoCard}>
              <img src="https://via.placeholder.com/150" alt="Video Thumbnail" className={styles.videoCardImage} />
              <h4>Sample Video Title</h4>
              <p>Sample Video Description</p>
            </div>
            <div className={styles.videoCard}>
              <img src="https://via.placeholder.com/150" alt="Video Thumbnail" className={styles.videoCardImage} />
              <h4>Sample Video Title</h4>
              <p>Sample Video Description</p>
            </div>
            <div className={styles.videoCard}>
              <img src="https://via.placeholder.com/150" alt="Video Thumbnail" className={styles.videoCardImage} />
              <h4>Sample Video Title</h4>
              <p>Sample Video Description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
