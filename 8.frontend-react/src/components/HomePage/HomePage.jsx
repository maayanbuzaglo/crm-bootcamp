import React from "react";
import NavBar from "../NavBar/NavBar";
import VerticalBar from "./VerticalBar";
import Line from "./Line";
import Pie from "./Pie";
import StackedBar from "./StackedBar";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const account_id = window.localStorage.getItem("account_id");

  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.dashboard}>
          <div className={styles.content}>
            <VerticalBar id={account_id} />
            <Line id={account_id} />
          </div>
          <div className={styles.content}>
            <div className={styles.pie}>
              <Pie id={account_id} />
            </div>
            <StackedBar id={account_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
