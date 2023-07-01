import React from "react";
import { profileImage } from "../links";
const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src={profileImage} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src={profileImage} alt="" />
      </div>
    </div>
  );
};

export default Message;
