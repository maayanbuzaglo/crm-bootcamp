import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <Link to="/homePage"></Link>
    </div>
  );
};

export default HomePage;
