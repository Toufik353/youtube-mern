import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; // Import icons
import styles from "./VideoPlayer.module.css";

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userLikes, setUserLikes] = useState({ liked: false, disliked: false });

  const { _id } = useParams();

  useEffect(() => {
    fetchVideoById();
    fetchComments();
  }, []);

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

  const handleLike = async () => {
    if (userLikes.liked) return;

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

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
      setUserLikes({ liked: true, disliked: userLikes.disliked });
      setVideo((prevVideo) => ({
        ...prevVideo,
        likes: data.likes,
        dislikes: data.dislikes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (userLikes.disliked) return;

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

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
      setVideo((prevVideo) => ({
        ...prevVideo,
        likes: data.likes,
        dislikes: data.dislikes,
      }));
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
            <button className={styles.likeButton} onClick={handleLike}>
              <FaThumbsUp /> {video.likes}
            </button>
            <button className={styles.dislikeButton} onClick={handleDislike}>
              <FaThumbsDown /> {video.dislikes}
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
                    <p>
                      <strong>{comment.username}</strong> • {comment.time}
                    </p>
                    <p>{comment.text}</p>
                    <button onClick={() => deleteComment(comment._id)} className={styles.deleteButton}>
                      Delete
                    </button>
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
