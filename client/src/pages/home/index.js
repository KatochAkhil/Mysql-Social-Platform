import React from "react";
import Sidebar from "../../common/sidebar";
import Feed from "../../components/feed";
import Rightbar from "../../components/rightbar";
import "./home.css";

function Homepage() {
  return (
    <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rightbar />
    </div>
  );
}

export default Homepage;
