import React, { useEffect } from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

const Home = () => {
  useEffect(() => {
    localStorage.removeItem("chat");
  }, []);
  return (
    <div className="home">
      <div className="container">
        <SideBar />
        {/* <Chat /> */}
      </div>
    </div>
  );
};

export default Home;
