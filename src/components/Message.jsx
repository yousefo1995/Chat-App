import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Box, Stack } from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";

import ReactionsMenu from "./ReactionsMenu";

const Message = ({ messages, message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef(null);
  const [showReactions, setShowReactions] = useState(false);

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

  const getReaction = () => {
    if (message.reactions) {
      switch (message.reactions) {
        case "heart":
          return <FavoriteTwoToneIcon />;
        case "sad":
          return <SentimentDissatisfiedTwoToneIcon />;
        case "dislike":
          return <ThumbDownAltTwoToneIcon />;
        default:
          console.log("error Invalid reaction");
          break;
      }
    }
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
        <span className="timestamp">
          <span className="hour">{message.timeH}</span>
          <span className="separator">:</span>
          <span className="minute">{message.timeM}</span>
        </span>
      </div>
      <div className="messageContent">
        <Stack
          flexDirection={
            currentUser.uid === message.senderId ? "row" : "row-reverse"
          }
          alignItems="center"
        >
          {showReactions && (
            <Box
              onMouseLeave={() =>
                setTimeout(() => setShowReactions(false), 4000)
              }
            >
              <ReactionsMenu message={message} messages={messages} />
            </Box>
          )}
          {message.text && (
            <p
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() =>
                setTimeout(() => setShowReactions(false), 4000)
              }
            >
              {message.text}
            </p>
          )}
          <Stack
            position="absolute"
            right={currentUser.uid === message.senderId && 0}
            left={currentUser.uid !== message.senderId && 0}
            bottom={-2}
          >
            {message.reactions && getReaction()}
          </Stack>
        </Stack>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
