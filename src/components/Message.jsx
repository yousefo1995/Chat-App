import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Box, Stack } from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";

import ReactionsMenu from "./ReactionsMenu";

const Message = ({ messages, message, showUserImage }) => {
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
        {showUserImage && (
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: !showUserImage && "100%",
          }}
        >
          <span className="timestamp">
            <span className="hour">{message.timeH}</span>
            <span className="separator">:</span>
            <span className="minute">{message.timeM}</span>
          </span>
        </div>
      </div>
      <div className="messageContent">
        <Stack
          flexDirection={
            currentUser.uid === message.senderId ? "row" : "row-reverse"
          }
          alignItems="center"
        >
          {message.img === undefined && showReactions && (
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
            bottom={message.img ? -24 : 0}
          >
            {message.reactions && getReaction()}
          </Stack>
        </Stack>
        <Stack
          flexDirection={
            currentUser.uid === message.senderId ? "row-reverse" : "row"
          }
          alignItems="center"
        >
          {message.img && (
            <img
              src={message.img}
              alt=""
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() =>
                setTimeout(() => setShowReactions(false), 4000)
              }
            />
          )}
          {message.img && showReactions && (
            <Box
              onMouseLeave={() =>
                setTimeout(() => setShowReactions(false), 4000)
              }
            >
              <ReactionsMenu message={message} messages={messages} />
            </Box>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Message;
