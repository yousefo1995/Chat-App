import React from "react";
const Login = () => {
  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat app</span>
          <span className="title">Login</span>
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign in</button>
          </form>
          <p>You dont have an account? Regoster</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
