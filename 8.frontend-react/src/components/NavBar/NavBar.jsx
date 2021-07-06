import React from "react";
import { NavLink } from "react-router-dom";
// import "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className="header">
      <div className="link">
        <NavLink to="/homePage" id="link1">
          Home
        </NavLink>
        <NavLink to="/addUser" id="link2">
          Users
        </NavLink>
        <NavLink
          to="/login"
          id="link3"
          onClick={() => localStorage.removeItem("user_token")}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
