import React, { useState } from "react";
import { FaBars, FaSearch, FaMicrophone, FaVideo, FaBell } from "react-icons/fa";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, onSignOut, onSearch }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value); // Pass search term to parent (App)
  };

  const handleSignOut = () => {
    // Clear user data and authentication token
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setDropdownVisible(false);
    navigate("/login");
  };

  // Get user data from localStorage
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <header className={`${styles.youtubeHeader} ${styles.fixedHeader}`}>
      {/* Left Section */}
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

      {/* Center Search Section */}
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

      {/* Right Section */}
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
    </header>
  );
};

export default Header;
