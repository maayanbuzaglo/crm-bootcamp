import React from "react";
import Button from "../Button/Button";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Link to="/homePage">
        <Button
          className="logout"
          text="logout"
          onClick={() => localStorage.removeItem("user_token")}
        />
      </Link>
    </div>
  );
};

export default HomePage;
