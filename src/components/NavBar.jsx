import React from "react";
import { profileImage } from "../links";

const NavBar = () => {
  return (
    <div className="navBar">
      <span className="logo">Chat app</span>
      <div className="user">
        <img src={profileImage} alt="" />
        <span>name</span>
        <button>Logout </button>
      </div>
    </div>
  );
};

export default NavBar;
