import React from "react";
import "./style.css";
export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
          alt=""
        />
        <p className="messageText">This is the message Text</p>
      </div>
      <div className="messageBottom"> 1 Min ago</div>
    </div>
  );
}
