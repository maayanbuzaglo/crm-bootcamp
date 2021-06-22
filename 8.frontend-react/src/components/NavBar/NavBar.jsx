import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <button>
      <NavLink to="/homePage">Home</NavLink>
    </button>
  );
};

export default NavBar;
