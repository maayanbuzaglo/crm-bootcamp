import React from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <button className="home">
        <Link to="/login">logout</Link>
      </button>
    </div>
  );
};

export default HomePage;
