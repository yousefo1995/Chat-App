import React, { useContext, useEffect, useState } from "react";
import UserChat from "./UserChat";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch, data } = useContext(ChatContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u, lastMessageText) => {
    dispatch({ type: "CHANGE-USER", payload: u });
    navigate("chat");
  };

  const userChats = Object.entries(chats);
  const sortedUserChats = userChats.sort((a, b) => b[1].date - a[1].date);

  return (
    <div className="chats">
      {sortedUserChats.map(
        (chat) =>
          chat[0] !== "null" && (
            <UserChat
              name={chat[1]?.userinfo?.displayName}
              src={chat[1]?.userinfo?.photoURL}
              lastMessage={chat[1].lastMessage?.text}
              isUnRead={chat[1].lastMessage?.isUnRead}
              key={chat[0]}
              onClick={() =>
                handleSelect(chat[1].userinfo, chat[1].lastMessage?.text)
              }
            />
          )
      )}
    </div>
  );
};

export default Chats;
