import React from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <button>
        <Link to="/login"> take me to login</Link>
      </button>
      <button>
        <Link to="/signUp">take me to signUp</Link>
      </button>
    </div>
  );
};

export default HomePage;
