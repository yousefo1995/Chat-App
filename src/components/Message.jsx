import React, { useContext, useEffect, useRef } from "react";
import { profileImage } from "../links";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot, Timestamp } from "@firebase/firestore";
import { db } from "../firebase";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const time = () => {
    const messageTime = Timestamp.now() - message.date;
    const minutesAgo = Math.floor(messageTime / (60 * 1000));
    return minutesAgo;
  };
  return (
    <div
      ref={ref}
      className={`message ${currentUser.uid === message.senderId && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{time()} min</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
