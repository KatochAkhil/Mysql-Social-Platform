import React from "react";
import "./style.css";

export default function Message({ own, message }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      key={message.id}
      className={message?.senderId === user?.userId ? "message own" : "message"}
    >
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom"> {message.createdAt}</div>
    </div>
  );
}
