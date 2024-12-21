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
    fetchChannelData();
  }, [channelId]);

  const fetchChannelData = async () => {
    try {
      const channelResponse = await fetch(`https://youtube-mern-backend-api.onrender.com/channel/${channelId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!channelResponse.ok) {
        if (channelResponse.status === 404) {
          setChannelData(null);
          setVideos([]);
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch channel data');
      }

      const channelData = await channelResponse.json();
      localStorage.setItem('channelId', channelData._id);
        setChannelData(channelData);
        console.log("channel Data",channelData)

      const videosResponse = await fetch(`https://youtube-mern-backend-api.onrender.com/videos?channelId=${channelId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!videosResponse.ok) {
        throw new Error('Failed to fetch videos');
      }

      const videoData = await videosResponse.json();

      // Filter videos to only include those that belong to the current channel/user
      const filteredVideos = videoData.filter(video => video.uploader === channelData.owner);
      setVideos(filteredVideos);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

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
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video._id} className={styles.videoCard}>
                    <Link to={`/video/${video._id}`}>
                      <img src={video.thumbnailUrl} alt={video.title} />
                      <h4>{video.title}</h4>
                      <p>
                        {video.views} views •{' '}
                        {new Date(video.uploadDate).toLocaleDateString()}
                      </p>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No videos found for this channel.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No channel found</p>
      )}
    </div>
  );
};

export default ChannelPage;
