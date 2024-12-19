import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import styles from "./App.module.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div className={styles.app}>
      <Header toggleSidebar={toggleSidebar} onSearch={handleSearch} />
      <div className={styles.mainContent}>
        <Sidebar isOpen={sidebarOpen} />
        <div className={styles.content}>
                  <Outlet context={{ searchTerm }} />
        </div>
      </div>
    </div>
  );
}

export default App;
