import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserspostsById } from "../../utils/endpoints";
import Post from "../post";
import SharePost from "../share";
import "./feed.css";
import { useDispatch } from "react-redux";
import { getUsersPosts } from "../../redux/action";

function Feed({ username }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      await axios
        .get(getUserspostsById(user?.userId))
        .then((res) => {
          setPosts(res.data.posts.rows);
          dispatch(getUsersPosts(res.data.posts.rows));
        })
        .catch((err) => console.log(err));
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <SharePost />
        {loading === true ? (
          <p>Loading</p>
        ) : (
          <>
            {posts.map((item) => (
              <Post post={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;
