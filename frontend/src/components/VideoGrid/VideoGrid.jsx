import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import VideoCard from "../Videocard/Videocard.jsx";
import styles from "./VideoGrid.module.css";

const VideoGrid = () => {
    const { searchTerm } = useOutletContext();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:5005/videos');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
      setVideos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredVideos = videos.filter((video) =>
    video.title && video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.videoGrid}>
      {filteredVideos.map((video, index) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
