import React from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Link to="/homePage">
        <button
          className="logout"
          onClick={() => localStorage.removeItem("user_token")}
        >
          logout
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
