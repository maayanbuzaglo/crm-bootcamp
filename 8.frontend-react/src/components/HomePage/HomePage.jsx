import React from "react";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <Link to="/homePage"></Link>
    </div>
  );
};

export default HomePage;
