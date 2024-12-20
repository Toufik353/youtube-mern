import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ChannelPage.module.css';

const ChannelPage = () => {
  const { channelId } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const channelResponse = await fetch(`http://localhost:5005/channel/${channelId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!channelResponse.ok) {
          throw new Error('Failed to fetch channel data');
        }

          const channelData = await channelResponse.json();
          console.log("channel data",channelData)
        setChannelData(channelData);

        const videosResponse = await fetch(`http://localhost:5005/videos?channelId=${channelId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!videosResponse.ok) {
          throw new Error('Failed to fetch videos');
        }

        const videoData = await videosResponse.json();
        setVideos(videoData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [channelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.channelPage}>
      {channelData ? (
        <div className={styles.channelDetails}>
          {/* <div className={styles.banner}>
            <img src={channelData.channelBanner} alt="Channel Banner" />
          </div> */}
          <div className={styles.profile}>
            <div className={styles.avatarPlaceholder}>
              <img
                src={channelData.channelBanner}
                alt="Channel Avatar"
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.channelInfo}>
              <h2>{channelData.channelName}</h2>
              <p>{channelData.description}</p>
              <p>Handle: @{channelData.channelHandle}</p>
              <p>Subscribers: {channelData.subscribers}</p>
              <p>Videos: {channelData.videoCount}</p>
              <p>Joined: {new Date(channelData.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className={styles.videos}>
            <h3>Videos</h3>
            <div className={styles.videoList}>
              {videos.map(video => (
                <div key={video._id} className={styles.videoCard}>
                  <Link to={`/video/${video._id}`}>
                    <img src={video.thumbnailUrl} alt={video.title} />
                    <h4>{video.title}</h4>
                    <p>{video.views} views • {new Date(video.uploadDate).toLocaleDateString()}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No channel data available</p>
      )}
    </div>
  );
};

export default ChannelPage;