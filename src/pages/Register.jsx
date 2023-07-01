import React from "react";
import addAvatar from "../images/addAvatar.png";
const Register = () => {
  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat app</span>
          <span className="title">Register</span>
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input className="fileInput" type="file" id="file" />
            <label htmlFor="file">
              <img src={addAvatar} alt="" />
              <span>Add avatar</span>
            </label>
            <button>Sign up</button>
          </form>
          <p>You have an account? Login</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
