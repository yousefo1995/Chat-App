import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = () => {
  // const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const handleLogout = () => {
    signOut(auth);
    // navigate("/login"); // use protected routes instead of this
  };
  return (
    <div className="navBar">
      <div className="user">
        <div className="nameAndImg">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
        </div>
        <span className="logo">Chat app</span>
        {/* <button onClick={handleLogout}>Logout </button> */}
        <LogoutIcon onClick={handleLogout} sx={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};
export default NavBar;
