import React from "react";
import { NavLink } from "react-router-dom";
import setting from "../../styles/img/setting.png";
import chat from "../../styles/img/chat.svg";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "./NavBar.module.scss";

const NavBar = (props) => {
  return (
    <div>
      <CssBaseline />
      {props.userType === "delivery person" ? (
        <div className={styles.header}>
          <NavLink
            to="/login"
            onClick={() => localStorage.removeItem("user_token")}
            id={styles.link}
          >
            Logout
          </NavLink>
        </div>
      ) : (
        <div className={styles.header}>
          <div>
            <NavLink to="/homePage" id={styles.link}>
              Home
            </NavLink>
            <NavLink to="/orders" id={styles.link}>
              Orders
            </NavLink>
            <NavLink to="/clients" id={styles.link}>
              Clients
            </NavLink>
            <NavLink to="/productsTypes" id={styles.link}>
              Meals
            </NavLink>
          </div>
          <div className={styles.rightLinks}>
            <div id={styles.chat}>
              <NavLink to="/chat">
                <img
                  src={chat}
                  alt="chat"
                  style={{
                    display: "flex",
                    width: "37px",
                    marginRight: "14px",
                    cursor: "pointer",
                  }}
                />
              </NavLink>
            </div>
            <div className={styles.dropLink} id={styles.setting}>
              <img
                src={setting}
                alt="setting"
                style={{
                  display: "flex",
                  width: "25px",
                  cursor: "pointer",
                }}
              />
              <div className={styles.dropdownContent}>
                <NavLink to="/users" id={styles.dropdownLink}>
                  Team
                </NavLink>
                <NavLink
                  to="/login"
                  id={styles.dropdownLink}
                  onClick={() => localStorage.removeItem("user_token")}
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
