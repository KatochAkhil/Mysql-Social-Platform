import React, { useEffect, useRef, useState } from "react";
import Chatonline from "../../common/chatOnline";
import Conversation from "../../common/conversation";
import Message from "../../common/message";
import "./style.css";
import axios from "axios";
import {
  searchUser,
  createConversation,
  getConversation,
  getAllMessages,
  postMessage,
} from "../../utils/endpoints";
import { io } from "socket.io-client";

function Messenger() {
  const [search, setSearch] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState();
  // const [socket, setSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const socket = useRef("ws://localhost:8900");

  useEffect(() => {
    socket.current?.emit("addUser", user.userId);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  const scrollRef = useRef();
  const handleSearch = async (e) => {
    await axios
      .get(searchUser(e.target.value))
      .then((res) => {
        setSearch(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateConv = async (e) => {
    await axios
      .post(createConversation, {
        senderId: user?.userId,
        reciverId: e?.id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getAllConversations = async () => {
      await axios
        .get(getConversation(user?.userId))
        .then((res) => {
          setConversation(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllConversations();
  }, [user?.userId]);

  useEffect(() => {
    const getMessages = async () => {
      await axios.get(getAllMessages(currentChat?.id)).then((res) => {
        setMessages(res.data);
      });
    };
    getMessages();
  }, [currentChat?.id, textMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(postMessage, {
        conversationsId: currentChat?.id,
        senderId: user?.userId,
        text: textMessage,
      })
      .then((res) => {
        setTextMessage("");
      });
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
              onChange={(e) => handleSearch(e)}
            />
            <div className="search_dropdown">
              <div>
                {search?.map((item) => (
                  <div
                    key={item.id}
                    className="image_with_text"
                    onClick={() => handleCreateConv(item)}
                  >
                    <img
                      src={
                        `${process.env.REACT_APP_IMAGE_URL}/${item.image}` ||
                        "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
                      }
                      alt={item.name}
                      className="search_user_image"
                    />
                    <h3>{item.name}</h3>
                  </div>
                ))}
              </div>
            </div>
            {conversation?.map((item) => (
              <div onClick={() => setCurrentChat(item)}>
                <Conversation conversation={item} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {currentChat ? (
                <>
                  {messages?.map((item) => (
                    <div className="" ref={scrollRef}>
                      <Message
                        message={item}
                        own={item.senderId === user?.userId}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <span className="noConversationText">
                    Open a conversation to start a chat.
                  </span>
                </>
              )}
            </div>
            <div className="chatBoxBottom">
              <form
                onSubmit={handleSubmit}
                className="w-100 d-flex align-items-center "
              >
                <textarea
                  className="chatMessageInput"
                  placeholder="Write Message"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                ></textarea>
                <button type="submit" className="chatSubmitButton">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <Chatonline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
