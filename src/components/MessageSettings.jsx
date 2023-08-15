import * as React from "react";
import Popover from "@mui/material/Popover";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Stack } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function MessageSettings({
  message,
  messages,
  setShowSettings,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //  delete message from firebase
  const handleDeleteMessage = async () => {
    if (message.senderId === currentUser.uid) {
      if (message.img) {
        const messageIndex = messages.findIndex((mes) => mes.id === message.id);
        const updatedMessage = {
          ...message,
          img: null,
          text: " This image was deleted.",
          isDeleted: true,
          reactions: null,
        };
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
        const updatedMessage = {
          ...message,
          text: "This message was deleted.",
          isDeleted: true,
          reactions: null,
        };
        messages[messageIndex] = updatedMessage;
        try {
          const chatRef = doc(db, "chats", data.chatId);
          await updateDoc(chatRef, {
            messages: messages,
          });
        } catch (err) {
          console.log(err);
        }
      }
      handleClose();
      setShowSettings(false);
    } else {
      console.log("cant delete");
    }
  };

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon />{" "}
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
          vertical: "center",
          horizontal: "center",
        }}
        // sx={{
        //   "& .MuiPopover-paper": {
        //     backgroundColor: "#DEDEDE",
        //     borderRadius: "50px",
        //   },
        // }}
      >
        <Stack bgcolor="#F1F1F1" padding={1} width={64}>
          <Button disabled>Reply</Button>

          <Button disabled>Forward</Button>
          {message.senderId === currentUser.uid ? (
            <Button onClick={handleDeleteMessage}>
              {" "}
              <DeleteIcon />
              Delete
            </Button>
          ) : (
            <Button disabled>
              {" "}
              <DeleteIcon />
              Delete
            </Button>
          )}
        </Stack>
      </Popover>
    </div>
  );
}
