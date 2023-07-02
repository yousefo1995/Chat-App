import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const NavBar = () => {
  // const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleLogout = () => {
    signOut(auth);
    // navigate("/login"); // use protected routes instead of this
  };
  return (
    <div className="navBar">
      <span className="logo">Chat app</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>Logout </button>
      </div>
    </div>
  );
};

export default NavBar;
