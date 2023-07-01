import React from "react";
import { profileImage } from "../links";
const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="F ind a user" />
      </div>
      <div className="userChat">
        <img src={profileImage} alt="" />
        <div className="userChatInfo">
          <span>name</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
