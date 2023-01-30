import React from "react";
import "./style.css";

export default function Conversation({ conversation, currentUser }) {
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
        alt=""
      />
      <span className="conversationName">User Name</span>
    </div>
  );
}
