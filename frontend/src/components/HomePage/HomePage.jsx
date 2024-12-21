import React, { useEffect, useState } from 'react';
import VideoCard from '../Videocard/Videocard.jsx';
import styles from './HomePage.module.css';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch('https://youtube-mern-backend-api.onrender.com/videos');
      const data = await response.json();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div className={styles.home}>
      <header className={styles.header}>YouTube Clone</header>
      <div className={styles.sidebar}>Sidebar</div>
      <div className={styles.content}>
        <div className={styles.filters}>Filters</div>
        <div className={styles.grid}>
          {videos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
