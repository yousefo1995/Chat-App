import React from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Chats from "../components/Chats";

const SideBar = () => {
  return (
    <div className="sideBar">
      <NavBar />
      <Search />
      <Chats />
    </div>
  );
};

export default SideBar;
