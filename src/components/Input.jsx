import React, { useContext, useEffect, useState } from "react";
import attach from "../images/attach.png";
import imgIcon from "../images/img.png";
import likeIcon from "../images/like.png";

import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { sendMessageHandler, sendLikeHandler } from "./functions/sendHandler";

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
  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageIsFowrarded, setImageIsFowrarded] = useState(false);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (focusOnInput) {
      inputRef.current.focus();
    }
  }, [focusOnInput]);
  useEffect(() => {
    const forwardedMessage = JSON.parse(localStorage.getItem("forward"));
    if (forwardedMessage?.type === "text") {
      setText(forwardedMessage.text);
    } else if (forwardedMessage?.type === "image") {
      setImg(forwardedMessage.img);
      setImageIsFowrarded(true);
    }
    localStorage.removeItem("forward");
  }, []);
  const sendMessage = () => {
    setShowReply(false);

    sendMessageHandler(
      data,
      currentUser,
      text,
      img,
      showReply,
      originalReplayedMessage,
      imageIsFowrarded
    );
    setText("");
    setImg(null);
    setImageIsUploaded(false);
    setImageUrl(null);
    setOrginalReplayedMessage({});
    setFocusOnInput(false);
    setImageIsFowrarded(false);
  };
  const fileHandler = (e) => {
    setImg(e.target.files[0]);
    setImageIsUploaded(true);
  };
  const sendLike = () => {
    sendLikeHandler(
      data,
      currentUser,
      text,
      showReply,
      originalReplayedMessage
    );
  };
  const handleSubmimt = (e) => {
    e.preventDefault();
    if (img != null || text !== "") {
      sendMessage(e);
    } else {
      sendLike();
    }
  };
  useEffect(() => {
    if (img && !imageIsFowrarded) {
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
      {imageIsFowrarded && (
        <img
          style={{
            width: "70px",
            maxHeight: "40px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
          src={img}
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
