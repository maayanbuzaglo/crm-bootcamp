import React from "react";
import logo from "../../styles/img/logo.svg";
import styles from "./SideBoarding.module.scss";

const SideBoarding = () => {
  return (
    <div>
      <img src={logo} alt="logo" id={styles.img} />
      <div className={styles.side}></div>
    </div>
  );
};

export default SideBoarding;
