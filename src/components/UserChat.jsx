import React from "react";

const UserChat = ({
  src,
  name,
  showAddBtn = false,
  onClick,
  onClickBtn,
  lastMessage,
  isUnRead,
}) => {
  // const userChatClassname = showAddBtn ? "userChat removePointer" : "userChat";

  // const handleRemoveUnReadMark = async () => {
  //   if (lastMessage) {
  //     await updateDoc(doc(db, "userChats", currentUser.uid), {
  //       [data.chatId + ".lastMessage"]: {
  //         lastMessage,
  //         isUnRead: false,
  //       },
  //     });
  //   }
  // };
  // useEffect(() => {
  //   handleRemoveUnReadMark();
  // }, [data]);
  return (
    <div
      className={`userChat ${showAddBtn ? "removePointer" : ""}`}
      onClick={onClick}
    >
      <div className="userChatContainer">
        <img src={src} alt="" />
        <div className="userChatInfo">
          <span>{name}</span>
          <p>{lastMessage}</p>
        </div>
      </div>
      {isUnRead && <div className="unReadDot"></div>}
      {/* {showAddBtn && (
        <button className="addBtn" onClick={onClickBtn}>
          Add
        </button>
      )} */}
    </div>
  );
};

export default UserChat;
