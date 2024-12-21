import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import VideoCard from "../Videocard/Videocard.jsx";
import styles from "./VideoGrid.module.css";

const categories = ["All", "Music", "Education", "Entertainment", "Sports", "Technology"]; // Example categories

const VideoGrid = () => {
  const { searchTerm } = useOutletContext();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, searchTerm, selectedCategory]);

  const fetchVideos = async () => {
    try {
      const response = await fetch("https://youtube-mern-backend-api.onrender.com/videos");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setVideos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterVideos = () => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter((video) =>
        video.title && video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }

    setFilteredVideos(filtered);
  };

  return (
    <div className={styles.videoGridContainer}>
      <div className={styles.filters}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.filterButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.videoGrid}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => <VideoCard key={video._id} video={video} />)
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default VideoGrid;
