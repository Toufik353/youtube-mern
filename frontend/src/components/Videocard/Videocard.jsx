import React from "react";
import { Link } from "react-router-dom";
import styles from "./VideoCard.module.css";

const VideoCard = ({ video }) => {
    const {  _id, thumbnailUrl, title, channel, avatar, views, duration, publishedTime } = video;
    
    console.log("videoId",_id)

  return (
    <Link to={`/videos/${_id}`} className={styles.videoCard}>
      {/* Thumbnail */}
      <div className={styles.videoThumbnail}>
        <img src={thumbnailUrl} alt={title} />
        <span className={styles.videoDuration}>{duration}</span>
      </div>

      {/* Video Info */}
      <div className={styles.videoInfo}>
        <img src={avatar} alt="Channel Avatar" className={styles.channelAvatar} />
        <div>
          <h3 className={styles.videoTitle}>{title}</h3>
          <p className={styles.videoChannel}>{channel}</p>
          <p className={styles.videoStats}>{views} views• {publishedTime}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
