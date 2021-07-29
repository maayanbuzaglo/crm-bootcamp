import React from "react";
import NavBar from "../NavBar/NavBar";
import VerticalBar from "./VerticalBar";
import Line from "./Line";
import Pie from "./Pie";
import StackedBar from "./StackedBar";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.dashboard}>
          <div className={styles.content}>
            <VerticalBar />
            <Line />
          </div>
          <div className={styles.content}>
            <div className={styles.pie}>
              <Pie />
            </div>
            <StackedBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
