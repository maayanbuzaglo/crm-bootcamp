import React from "react";
import { NavLink } from "react-router-dom";
// import "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className="header">
      <div className="link">
        <NavLink to="/homePage" id="link">
          Home
        </NavLink>
        <div style={{ cursor: "pointer" }} className="dropLink" id="link">
          Orders
          <div className="dropdown-content">
            <NavLink to="/orders" id="link">
              Orders list
            </NavLink>{" "}
            <NavLink to="/ordersCalendar" id="link">
              Calendar
            </NavLink>{" "}
          </div>
        </div>
        <div style={{ cursor: "pointer" }} className="dropLink" id="link">
          Tables
          <div className="dropdown-content">
            <NavLink to="/users" id="link">
              Users
            </NavLink>{" "}
            <NavLink to="/clients" id="link">
              Clients
            </NavLink>{" "}
            <NavLink to="/productsTypes" id="link">
              Meals
            </NavLink>{" "}
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
    </div>
  );
};

export default NavBar;
