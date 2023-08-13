import * as React from "react";
import Popover from "@mui/material/Popover";
import AddReactionTwoToneIcon from "@mui/icons-material/AddReactionTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";

import { IconButton, Stack } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Reaction from "./Reaction";

export default function ReactionsMenu({ message, messages }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data } = useContext(ChatContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //  addng reaction to message in firebase
  const handleChoosingReaction = async (reaction) => {
    if (message.reactions === reaction) {
      const messageIndex = messages.findIndex((mes) => mes.id === message.id);
      const updatedMessage = { ...message, reactions: null };
      messages[messageIndex] = updatedMessage;
      try {
        const chatRef = doc(db, "chats", data.chatId);
        await updateDoc(chatRef, {
          messages: messages,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      const messageIndex = messages.findIndex((mes) => mes.id === message.id);
      const updatedMessage = { ...message, reactions: `${reaction}` };
      messages[messageIndex] = updatedMessage;
      try {
        const chatRef = doc(db, "chats", data.chatId);
        await updateDoc(chatRef, {
          messages: messages,
        });
        handleClose();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <AddReactionTwoToneIcon />{" "}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            backgroundColor: "#DEDEDE",
            borderRadius: "50px",
          },
        }}
      >
        <Stack padding={2} gap={1} flexDirection="row">
          <Reaction
            message={message}
            reaction="heart"
            handleChoosingReaction={handleChoosingReaction}
          >
            <FavoriteTwoToneIcon />
          </Reaction>
          <Reaction
            message={message}
            reaction="sad"
            handleChoosingReaction={handleChoosingReaction}
          >
            <SentimentDissatisfiedTwoToneIcon />
          </Reaction>
          <Reaction
            message={message}
            reaction="dislike"
            handleChoosingReaction={handleChoosingReaction}
          >
            <ThumbDownAltTwoToneIcon />
          </Reaction>
        </Stack>
      </Popover>
    </div>
  );
}
