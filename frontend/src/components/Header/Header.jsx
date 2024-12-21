import React, { useState } from "react";
import { FaBars, FaSearch, FaMicrophone, FaVideo, FaBell, FaUser, FaPlus } from "react-icons/fa";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, onSignOut, onSearch }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateChannelVisible, setCreateChannelVisible] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelHandle, setChannelHandle] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const channelId = localStorage.getItem("channelId");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setDropdownVisible(false);
    navigate("/login");
  };

  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChannelBanner(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();

    const channelData = {
      channelName,
      channelHandle,
      description: channelDescription,
      channelBanner,
    };

    try {
      const response = await fetch("http://localhost:5005/channel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(channelData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        setCreateChannelVisible(false);
        setErrorMessage(errorData.message);
        return;
      }

      const data = await response.json();
      alert("Channel created successfully!");
      navigate(`/channel/${data._id}`);
      setCreateChannelVisible(false);
    } catch (error) {
      alert("Error creating channel. Please try again.");
    }
  };

  return (
    <header className={`${styles.youtubeHeader} ${styles.fixedHeader}`}>
      <div className={styles.logoSection}>
        <button
          className={`${styles.menuIcon} ${styles.visible}`}
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <div className={styles.logo}>
          <img
            src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
            alt="YouTube Logo"
          />
        </div>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className={styles.searchBtn}>
            <FaSearch />
          </button>
          <button className={styles.micBtn}>
            <FaMicrophone />
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        {userData ? (
          <>
            <button className={styles.iconBtn}>
              <FaVideo />
            </button>
            <button
              className={`${styles.iconBtn} ${styles.notificationIcon}`}
            >
              <FaBell />
              <span className={styles.notificationCount}>9+</span>
            </button>
            <div className={styles.profile}>
              <button
                onClick={() => setDropdownVisible((prev) => !prev)}
                className={`${styles.userName} ${styles.profileButton}`}
              >
                {userData.username.toUpperCase()[0]}
              </button>
              {isDropdownVisible && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownItem}>
                    <strong>Full Name:</strong> {userData.username || "N/A"}
                  </div>
                  <div className={styles.dropdownItem}>
                    <strong>Email:</strong> {userData.email || "N/A"}
                  </div>
                  {/* Create Channel Button in Dropdown */}
                  {!userData.channel && (
                    <button
                      onClick={() => setCreateChannelVisible(true)}
                      className={styles.dropdownItemBtn}
                    >
                      <FaPlus className={styles.icon} /> Create Channel
                    </button>
                  )}
                  <button
                    className={styles.dropdownItemBtn}
                    onClick={() => navigate(`/channel/${channelId}`)}
                  >
                    <FaUser className={styles.icon} /> My Channel
                  </button>
                  <button className={styles.signOutBtn} onClick={handleSignOut}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className={styles.signInBtn}>Login</button>
          </Link>
        )}
      </div>

      {isCreateChannelVisible && (
        <div className={styles.createChannelModal}>
          <div className={styles.createChannelFormContainer}>
            <h2 className={styles.createChannelTitle}>How you'll appear</h2>
            <form onSubmit={handleCreateChannel} className={styles.createChannelForm}>
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
              <div className={styles.avatarSection}>
                <label htmlFor="avatarUpload" className={styles.avatarLabel}>
                  {channelBanner ? (
                    <img
                      src={channelBanner}
                      alt="Avatar Preview"
                      className={styles.avatarPreview}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>Select Picture</div>
                  )}
                </label>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className={styles.fileInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Name</label>
                <input
                  type="text"
                  placeholder="Enter your channel name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Handle</label>
                <input
                  type="text"
                  placeholder="@yourhandle"
                  value={channelHandle}
                  onChange={(e) => setChannelHandle(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Description</label>
                <textarea
                  placeholder="Enter channel description"
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                  required
                  className={styles.inputField}
                />
              </div>
              <p className={styles.termsText}>
                By clicking Create Channel you agree to
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.termsLink}
                >
                  YouTube Terms of Service
                </a>
              </p>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setCreateChannelVisible(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.createBtn}>
                  Create Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
