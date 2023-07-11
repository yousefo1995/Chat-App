import React, { useContext } from "react";
import Input from "../components/Input";
import Messages from "../components/Messages";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="home">
      <div className="container">
        <div className="chat">
          <div className="chatInfo">
            <div className="nameAndImg">
              <img src={data.user?.photoURL} alt="" />
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      </div>
    </div>
  );
};

export default Chat;
