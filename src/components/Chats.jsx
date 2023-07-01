import React from "react";
import { profileImage } from "../links";
const chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img src={profileImage} alt="" />
        <div className="userChatInfo">
          <span>name</span>
          <p>hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={profileImage} alt="" />
        <div className="userChatInfo">
          <span>name</span>
          <p>hello</p>
        </div>
      </div>{" "}
      <div className="userChat">
        <img src={profileImage} alt="" />
        <div className="userChatInfo">
          <span>name</span>
          <p>hello</p>
        </div>
      </div>{" "}
      <div className="userChat">
        <img src={profileImage} alt="" />
        <div className="userChatInfo">
          <span>name</span>
          <p>hello</p>
        </div>
      </div>{" "}
      <div className="userChat">
        <img src={profileImage} alt="" />
        <div className="userChatInfo">
          <span>name</span>
          <p>hello</p>
        </div>
      </div>{" "}
      <div className="userChat">
        <img src={profileImage} alt="" />
        <div className="userChatInfo">
          <span>name</span>
          <p>hello</p>
        </div>
      </div>
    </div>
  );
};

export default chats;
