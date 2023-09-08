import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Messages from "../components/Messages";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  // const { data } = useContext(ChatContext);
  const [data, setData] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [originalReplayedMessage, setOrginalReplayedMessage] = useState({});
  const [focusOnInput, setFocusOnInput] = useState(false);
  const inputRef = useRef(null);

  const getData = () => {
    const dataFromLocalStorage = localStorage.getItem("chat");
    setData(JSON.parse(dataFromLocalStorage));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      <div className="container chatContainer">
        <div className="chat">
          <div className="chatInfo">
            <div className="nameAndImg">
              <img src={data?.user?.photoURL} alt="" />
              <span>{data?.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
          <Messages
            showReply={showReply}
            setShowReply={setShowReply}
            originalReplayedMessage={originalReplayedMessage}
            setOrginalReplayedMessage={setOrginalReplayedMessage}
            setFocusOnInput={setFocusOnInput}
          />
          <Input
            showReply={showReply}
            setShowReply={setShowReply}
            originalReplayedMessage={originalReplayedMessage}
            setOrginalReplayedMessage={setOrginalReplayedMessage}
            focusOnInput={focusOnInput}
            setFocusOnInput={setFocusOnInput}
            inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
