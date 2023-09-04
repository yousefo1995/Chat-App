import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import likeIcon from "../../images/like.png";

export const sendMessageHandler = async (
  data,
  currentUser,
  text,
  img,
  showReply,
  originalReplayedMessage
) => {
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
};

export const sendLikeHandler = async (
  data,
  currentUser,
  text,
  showReply,
  originalReplayedMessage
) => {
  // try doing this by useing sendMessage() and setImg or setText
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
