import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

const Messages = ({ scrollRef }) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className="messages" ref={scrollRef}>
      {messages.map((mes) => (
        <Message message={mes} messages={messages} key={mes.id} />
      ))}
    </div>
  );
};

export default Messages;
