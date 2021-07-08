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
        <NavLink to="/homePage" class="dropLink" id="link">
          Options
          <div class="dropdown-content">
            <NavLink to="/addUser" id="link">
              Users
            </NavLink>{" "}
            <NavLink to="/clients" id="link">
              Clients
            </NavLink>{" "}
            <NavLink to="/productsTypes" id="link">
              Meals
            </NavLink>{" "}
          </div>
        </NavLink>
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
