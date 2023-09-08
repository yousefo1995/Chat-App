import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import ReplyBox from "./ReplyBox";
import { Box } from "@mui/material";

const Messages = ({
  showReply,
  setShowReply,
  originalReplayedMessage,
  setOrginalReplayedMessage,
  setFocusOnInput,
}) => {
  const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatContext);
  const [data, setData] = useState({});
  const scrollRef = useRef();

  const getData = () => {
    const dataFromLocalStorage = localStorage.getItem("chat");
    setData(JSON.parse(dataFromLocalStorage));
  };
  useEffect(() => {
    getData();
  }, []);
  //
  console.log(data, "data local storage");

  useEffect(() => {
    if (data?.chatId) {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    }
  }, [data.chatId]);

  useEffect(() => {
    const scrollOptions = {
      behavior: "smooth",
    };

    const scrollToRef = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView(scrollOptions);
      }
    };

    scrollToRef();
  }, [messages]);

  return (
    <div className="messages" style={{ position: "relative" }}>
      {messages.map((mes, index) => {
        return (
          <Message
            message={mes}
            messages={messages}
            key={mes.id}
            showUserImage={
              mes.senderId !== (index !== 0 && messages[index - 1].senderId)
            }
            setShowReply={setShowReply}
            setOrginalReplayedMessage={setOrginalReplayedMessage}
            setFocusOnInput={setFocusOnInput}
          />
        );
      })}
      {showReply && (
        <ReplyBox
          setShowReply={setShowReply}
          name={originalReplayedMessage.senderName}
          text={originalReplayedMessage.messageText}
          img={originalReplayedMessage.messageImage}
        />
      )}

      <Box ref={scrollRef} />
    </div>
  );
};

export default Messages;
