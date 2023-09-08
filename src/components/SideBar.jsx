import React from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Chats from "../components/Chats";

import ForwardBox from "./ForwardBox";

const SideBar = () => {
  return (
    <div className="sideBar">
      <NavBar />
      <ForwardBox />
      <Search />
      <Chats />
    </div>
  );
};

export default SideBar;
