import React, { useContext, useEffect, useState } from "react";
import UserChat from "./UserChat";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "@firebase/firestore";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

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
  console.log(Object.entries(chats));
  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => (
        <UserChat
          name={chat[1].userinfo.displayName}
          src={chat[1].userinfo.photoURL}
          lastMessage={chat[1].userinfo.lastMessage?.text}
          key={chat[0]}
        />
      ))}
    </div>
  );
};

export default Chats;
