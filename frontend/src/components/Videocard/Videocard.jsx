import React from "react";
import { Link } from "react-router-dom";
import styles from "./VideoCard.module.css";

const VideoCard = ({ video }) => {
    const { _id, thumbnailUrl, title, channel, avatar, views, duration, publishedTime } = video;
    
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

  return (
    <Link to={`/videos/${_id}`} className={styles.videoCard}>
      {/* Thumbnail and Duration */}
      <div className={styles.videoThumbnail}>
        <img src={thumbnailUrl} alt={title} className={styles.thumbnailImage} />
        <span className={styles.videoDuration}>{duration}</span>
      </div>

      {/* Video Info */}
      <div className={styles.videoInfo}>
        <img src={avatar} alt="Channel Avatar" className={styles.channelAvatar} />
        <div className={styles.channelIntro}>
          <h3 className={styles.videoTitle}>{title}</h3>
          <p className={styles.videoChannel}>{channel}</p>
          <p className={styles.videoStats}>{views} views • {timeSince(publishedTime)}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
