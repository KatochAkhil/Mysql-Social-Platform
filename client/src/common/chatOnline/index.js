import React from "react";
import "./style.css";

export default function Chatonline() {
  return (
    <div>
      <div className="chatOnline">
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">New User</span>
        </div>
      </div>
    </div>
  );
}
