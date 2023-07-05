import React from "react";

const UserChat = ({
  src,
  name,
  showAddBtn = false,
  onClick,
  onClickBtn,
  lastMessage,
}) => {
  console.log(lastMessage, "lasssssssttmessage");
  // const userChatClassname = showAddBtn ? "userChat removePointer" : "userChat";
  return (
    <div
      className={`userChat ${showAddBtn ? "removePointer" : ""}`}
      onClick={onClick}
    >
      <img src={src} alt="" />
      <div className="userChatInfo">
        <span>{name}</span>
        <p>{lastMessage}</p>
      </div>
      {/* {showAddBtn && (
        <button className="addBtn" onClick={onClickBtn}>
          Add
        </button>
      )} */}
    </div>
  );
};

export default UserChat;
