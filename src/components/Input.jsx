import React, { useContext, useState } from "react";
import attach from "../images/attach.png";
import imgIcon from "../images/img.png";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async (e) => {
    e.preventDefault();

    if (img) {
      try {
        const storageRef = ref(storage, `chatImages/${data.chatId}/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const chatRef = doc(db, "chats", data.chatId);
        await updateDoc(chatRef, {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      } catch (err) {
        setError(true);
        console.log("Error uploading image:", err);
      }
    } else {
      try {
        const chatRef = doc(db, "chats", data.chatId);
        await updateDoc(chatRef, {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      } catch (err) {
        console.log("Error sending message:", err);
      }
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <form className="chatInput" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <img src={attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={imgIcon} alt="" />
        </label>
        <button>Send</button>
      </div>
    </form>
  );
};

export default Input;
