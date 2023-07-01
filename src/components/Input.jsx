import React from "react";
import attach from "../images/attach.png";
import img from "../images/img.png";
const Input = () => {
  return (
    <div className="chatInput">
      <input type="text" placeholder="Type somethihg ..." />
      <div className="send">
        <img src={attach} alt="" />
        <input type="text" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
