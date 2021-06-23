import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="header">
      <div className="link">
        <NavLink to="/homePage">Home</NavLink>
      </div>
    </div>
  );
};

export default NavBar;
