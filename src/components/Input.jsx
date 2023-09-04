import React, { useContext, useEffect, useState } from "react";
import attach from "../images/attach.png";
import imgIcon from "../images/img.png";
import likeIcon from "../images/like.png";

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

const Input = ({
  showReply,
  setShowReply,
  originalReplayedMessage,
  setOrginalReplayedMessage,
  focusOnInput,
  setFocusOnInput,
  inputRef,
}) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (focusOnInput) {
      inputRef.current.focus();
    }
  }, [focusOnInput]);

  const handleSend = async (e) => {
    setShowReply(false);
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
            senderName: currentUser.displayName,
            date: Timestamp.now(),
            img: downloadURL,
            timeH: new Date().getHours(),
            timeM: new Date().getMinutes(),
            isReplayed: showReply ? true : false,
            originalReplayedMessage: showReply ? originalReplayedMessage : null,
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
            senderName: currentUser.displayName,
            date: Timestamp.now(),
            timeH: new Date().getHours(),
            timeM: new Date().getMinutes(),
            isReplayed: showReply ? true : false,
            originalReplayedMessage: showReply ? originalReplayedMessage : null,
          }),
        });
      } catch (err) {
        console.log("Error sending message:", err);
      }
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: img ? "image" : text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: img ? "image" : text,
        isUnRead: true,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    setImageIsUploaded(false);
    setImageUrl(null);
    setOrginalReplayedMessage({});
    setFocusOnInput(false);
  };
  const fileHandler = (e) => {
    setImg(e.target.files[0]);
    setImageIsUploaded(true);
  };
  const sendLike = async () => {
    // try doing this by useing handleSend() and setImg or setText
    try {
      const chatRef = doc(db, "chats", data.chatId);
      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          senderName: currentUser.displayName,
          date: Timestamp.now(),
          img: likeIcon,
          timeH: new Date().getHours(),
          timeM: new Date().getMinutes(),
          isReplayed: showReply ? true : false,
          originalReplayedMessage: showReply ? originalReplayedMessage : null,
        }),
      });
    } catch (err) {
      console.log("Error sending like:", err);
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: "👍",
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: "👍",
        isUnRead: true,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  const handleSubmimt = (e) => {
    e.preventDefault();
    if (img != null || text !== "") {
      handleSend(e);
    } else {
      sendLike();
    }
  };
  useEffect(() => {
    if (img) {
      setImageUrl(URL.createObjectURL(img));
    }
  }, [img]);

  return (
    <form className="chatInput" onSubmit={handleSubmimt}>
      {imageIsUploaded && (
        <img
          style={{
            width: "70px",
            maxHeight: "40px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
          src={imageUrl}
          alt=""
        />
      )}
      <input
        type="text"
        placeholder="Type something..."
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <img src={attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          accept="image/*"
          onChange={fileHandler}
        />
        <label htmlFor="file">
          <img src={imgIcon} alt="" />
        </label>
        {img != null || text !== "" ? (
          <button>Send</button>
        ) : (
          <div>
            <button id="likeBtn" style={{ display: "none" }}></button>
            <label htmlFor="likeBtn">
              <img
                src={likeIcon}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </label>
          </div>
        )}
      </div>
    </form>
  );
};

export default Input;
