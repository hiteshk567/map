import React from "react";
import { NavLink } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import "./NavLinks.css";

const MainNavigation = () => {
  return (
    <React.Fragment>
      <MainHeader>
        <NavLink to="/">HOME</NavLink>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
