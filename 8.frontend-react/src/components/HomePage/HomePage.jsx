import React from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <button className="home">
        <Link to="/login">login</Link>
      </button>
      <button>
        <Link to="/signUp">signUp</Link>
      </button>
    </div>
  );
};

export default HomePage;
