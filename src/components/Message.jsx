import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef(null);

  useEffect(() => {
    const scrollOptions = {
      behavior: "smooth",
    };

    const scrollToRef = () => {
      if (ref.current) {
        ref.current.scrollIntoView(scrollOptions);
      }
    };

    scrollToRef();
  }, [message]);

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
        <span className="timestamp">
          <span className="hour">{message.timeH}</span>
          <span className="separator">:</span>
          <span className="minute">{message.timeM}</span>
        </span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
