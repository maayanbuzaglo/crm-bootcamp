import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Button from "../Button/Button";
import styles from "./ConfirmAlert.module.scss";

const ConfirmAlert = ({ onClick, title, text }) => {
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.confirmAlert}>
            <h1>{title}</h1>
            <div className={styles.buttonsWrap}>
              <Button
                text="yes"
                onClick={() => onClick()}
                extraStyles={{ width: "80px", margin: "10px" }}
              />
              <Button
                text="no"
                onClick={onClose}
                extraStyles={{ width: "80px", margin: "10px" }}
              />
            </div>
          </div>
        );
      },
    });
  };

  return (
    <>
      <h5 onClick={submit}>{text}</h5>
    </>
  );
};

export default ConfirmAlert;
