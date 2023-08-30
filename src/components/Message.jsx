import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Box, Stack } from "@mui/material";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import ReactionsMenu from "./ReactionsMenu";
import MessageSettings from "./MessageSettings";

const Message = ({ messages, message, showUserImage }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef(null);
  const [showSettings, setShowSettings] = useState(false);

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

  const showSettingsHandler = () => {
    if (!message.isDeleted) {
      setShowSettings(true);
    } else {
    }
  };
  const hideSettingsHandler = () => {
    setShowSettings(false);
  };

  return (
    <div
      ref={ref}
      className={`message ${currentUser.uid === message.senderId && "owner"}`}
      onMouseEnter={showSettingsHandler}
      onMouseLeave={hideSettingsHandler}
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
        {/* text and reaction for text*/}
        <Stack
          flexDirection={
            currentUser.uid === message.senderId ? "row" : "row-reverse"
          }
          alignItems="center"
          // position="relative"
        >
          {showSettings && (
            <Stack
              marginLeft="2px"
              marginTop={2}
              position="absolute"
              top={0}
              left={currentUser.uid !== message.senderId && 0}
              right={currentUser.uid === message.senderId && 0}
              color="#5d5b8d"
            >
              <MessageSettings
                message={message}
                messages={messages}
                setShowSettings={setShowSettings}
              />
            </Stack>
          )}
          {message.img === undefined && showSettings && (
            <Box>
              <ReactionsMenu message={message} messages={messages} />
            </Box>
          )}
          {message.text && (
            <p
              style={{
                maxWidth: "260px",
                display: "block",
                wordWrap: "break-word",
              }}
            >
              {message.text}
            </p>
          )}
          {message.reactions && (
            <Stack
              position="absolute"
              right={currentUser.uid === message.senderId && 0}
              left={currentUser.uid !== message.senderId && 0}
              bottom={message.img ? -24 : 0}
              bgcolor="#F1F1F1"
              border="1px solid #8da4f1"
              borderRadius="50%"
              padding="2px"
            >
              {getReaction()}
            </Stack>
          )}
        </Stack>
        {/* image  and reaction for images*/}
        <Stack
          flexDirection={
            currentUser.uid === message.senderId ? "row-reverse" : "row"
          }
          alignItems="center"
        >
          {message.img && <img src={message.img} alt="" />}
          {message.img && showSettings && (
            <Box>
              <ReactionsMenu message={message} messages={messages} />
            </Box>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default Message;
