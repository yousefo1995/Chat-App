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
  originalReplayedMessage,
  imageIsFowrarded,
  isLike
) => {
  if (img || isLike) {
    console.log("in img condition");
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
          img: imageIsFowrarded ? img : isLike ? likeIcon : downloadURL,
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
    console.log("in else condition");

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
      text: img ? "image" : isLike ? "👍" : text,
    },
    [data.chatId + ".date"]: Timestamp.now(), //serverTimestamp() xx
  });
  await updateDoc(doc(db, "userChats", data.user.uid), {
    [data.chatId + ".lastMessage"]: {
      text: img ? "image" : isLike ? "👍" : text,
      isUnRead: true,
    },
    [data.chatId + ".date"]: Timestamp.now(), //serverTimestamp() xx
  });
};
