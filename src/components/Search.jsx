import React, { useContext, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import UserChat from "./UserChat";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const getUsers = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      if (querySnapshot.empty) {
        setErr(true);
      }
      console.log(user, "searchuser");
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
    setUser(""); // new
    setErr(false); //new
  };
  const handleSearch = () => {
    getUsers();
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // const handleAddUser = () => {
  //   console.log("add"); // not done
  // };

  const handleSelect = async () => {
    const compinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const docRef = doc(db, "chats", compinedId);
      const res = await getDoc(docRef);
      if (!res.exists()) {
        await setDoc(doc(db, "chats", compinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [compinedId + ".userinfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [compinedId + ".date"]: serverTimestamp(),
          // [compinedId + ".lastMessage"]: "",
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [compinedId + ".userinfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [compinedId + ".date"]: serverTimestamp(),
          // [compinedId + ".lastMessage"]: "",
        });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
    setUsername("");
    setUser(null);
  };
  // try {
  // } catch (err) {
  //   console.log(err);
  // }

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
      {err && <span className="userNotFound">!User not found</span>}
      {user && (
        <UserChat
          src={user.photoURL}
          name={user.displayName}
          onClick={handleSelect}
          // showAddBtn={true}
          // onClickBtn={handleAddUser}
        />
      )}
    </div>
  );
};

export default Search;
