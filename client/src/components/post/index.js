import React, { useState } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";

function Post({ post, user }) {
  const [likes, setLikes] = useState(0);
  const [isLke, setisLiked] = useState(false);

  const URL = process.env.REACT_APP_IMAGE_URL;
  const likeHandler = () => {
    setLikes(isLke ? likes - 1 : likes + 1);
    setisLiked(!isLke);
  };

  return (
    <div key={post?.id} className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/`}>
              <img
                className="postProfileImg"
                src={
                  user?.image ||
                  "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
                }
                alt="profileImage"
              />
            </Link>
            <span className="postUsername"> {user?.name || "User Name"}</span>
            {/* <span className="postDate">{post.createdAt || new Date()}</span> */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.text}</span>
          {/* <span className="emojis">{post.emoji}</span> */}
          <img
            className="postImg"
            src={
              `${URL}/${post.image}` ||
              "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?w=826"
            }
            alt="postImage"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              onClick={likeHandler}
              src="./images/like.png"
              alt="like"
            />
            <img
              className="likeIcon"
              onClick={likeHandler}
              src="./images/heart.png"
              alt="unlike"
            />
            <span className="postLikeCounter">{likes} pepole like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">Comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
