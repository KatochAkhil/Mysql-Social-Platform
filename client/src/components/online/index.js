import React from "react";
import "./online.css";

function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
          alt="profileImage"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">UserName</span>
    </li>
  );
}

export default Online;
