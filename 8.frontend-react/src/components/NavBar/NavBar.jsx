import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.header}>
      <NavLink to="/homePage" id="link">
        Home
      </NavLink>
      <div className={styles.dropLink} id="link">
        Orders
        <div className={styles.dropdownContent}>
          <NavLink to="/orders" id="link">
            Orders list
          </NavLink>
          <NavLink to="/ordersCalendar" id="link">
            Calendar
          </NavLink>
        </div>
      </div>
      <div className={styles.dropLink} id="link">
        Tables
        <div className={styles.dropdownContent}>
          <NavLink to="/users" id="link">
            Users
          </NavLink>
          <NavLink to="/clients" id="link">
            Clients
          </NavLink>
          <NavLink to="/productsTypes" id="link">
            Meals
          </NavLink>
        </div>
      </div>
      <NavLink
        to="/login"
        id="link"
        onClick={() => localStorage.removeItem("user_token")}
      >
        Logout
      </NavLink>
    </div>
  );
};

export default NavBar;
