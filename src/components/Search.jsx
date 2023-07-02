import React, { useState } from "react";
import { profileImage } from "../links";
import { auth, db } from "../firebase";
import { getDoc, getDocs } from "@firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { async } from "q";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const getUsers = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setErr(true); // error is not working
    }
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
    setUser(""); // new
  };
  const handleSearch = () => {
    getUsers();
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onKeyDown={handleKey}
          onChange={handleChange}
        />
      </div>
      {err && <span>!User not found</span>}
      {user && (
        <div className="userChat">
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
