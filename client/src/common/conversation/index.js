import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserprofile } from "../../utils/endpoints";
import "./style.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation?.reciverId;
    const getFriendsChat = async () => {
      await axios
        .get(getUserprofile(friendId))
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getFriendsChat();
  }, [conversation?.reciverId]);

  return (
    <div key={conversation?.id} className="conversation">
      <img
        className="conversationImg"
        src={
          user?.image ||
          "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
        }
        alt={user?.name}
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
