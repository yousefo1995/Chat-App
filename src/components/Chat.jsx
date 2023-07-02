import React from "react";
import Input from "../components/Input";
import Messages from "../components/Messages";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";

const chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Name</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default chat;
