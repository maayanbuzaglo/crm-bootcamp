import React from "react";
import styles from "./Button.module.scss";

const Button = ({ text, onClick, extraStyles }) => {
  return (
    <button className={styles.button} onClick={onClick} style={extraStyles}>
      {text}
    </button>
  );
};

export default Button;
