import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { FaHome, FaFire, FaListAlt, FaHistory, FaClock, FaThumbsUp } from "react-icons/fa";

const Sidebar = ({ isOpen = true, toggleSidebar }) => {
  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <ul className={styles.sidebarMenu}>
        <li>
          <Link to="/videos" className={styles.iconLink}>
            <FaHome size={24} />
            {isOpen && <span>Home</span>}
          </Link>
        </li>
        <li>
          <FaFire size={24} />
          {isOpen && <span>Trending</span>}
        </li>
        <li>
          <FaListAlt size={24} />
          {isOpen && <span>Subscriptions</span>}
        </li>
        <li>
          <FaListAlt size={24} />
          {isOpen && <span>Library</span>}
        </li>
        <li>
          <FaHistory size={24} />
          {isOpen && <span>History</span>}
        </li>
        <li>
          <FaClock size={24} />
          {isOpen && <span>Watch Later</span>}
        </li>
        <li>
          <FaThumbsUp size={24} />
          {isOpen && <span>Liked Videos</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
