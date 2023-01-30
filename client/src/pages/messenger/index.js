import React from "react";
import Chatonline from "../../common/chatOnline";
import Conversation from "../../common/conversation";
import Message from "../../common/message";
import "./style.css";

function Messenger() {
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            <Conversation
            // key={conv._id}
            // conversation={conv}
            // currentUser={user}
            />
            <Conversation
            // key={conv._id}
            // conversation={conv}
            // currentUser={user}
            />
            <Conversation
            // key={conv._id}
            // conversation={conv}
            // currentUser={user}
            />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write Message"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
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
