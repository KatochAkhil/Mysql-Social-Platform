import React, { useState } from "react";
import "./share.css";
import { PermMedia, Label, EmojiEmotions, Cancel } from "@mui/icons-material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { addPost } from "../../utils/endpoints";
// import EmojiPicker from "emoji-picker-react";

export default function SharePost() {
  const [file, setFile] = useState();
  // const [openEmoji, setOpenEmoji] = useState(false);
  const [emoji, setEmoji] = useState();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const formSubmit = async (e) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", e.text);
      formData.append("location", e.location);
      formData.append("likes", e.likes);
      formData.append("userId", user?.userId);

      await axios
        .post(addPost, formData)
        .then((res) => {
          reset();
          setEmoji("");
          setFile(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} className="shareBottom">
        <div className="share">
          <div className="shareWrapper">
            <div className="shareTop">
              <img
                className="shareProfileImg"
                src={
                  "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
                }
                alt="profile"
              />
              <input
                placeholder={`What's in your mind  ${user?.name} ?`}
                className="shareInput"
                {...register("text")}
              />
            </div>
            <hr className="shareHr" />
            {file && (
              <div className="shareimageContainer">
                <img
                  src={URL.createObjectURL(file)}
                  alt="share_Image"
                  className="shareImg"
                />
                <Cancel
                  className="shareCancelImg"
                  onClick={() => setFile(null)}
                />
              </div>
            )}
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  type="file"
                  id="file"
                  {...register("file")}
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".png, .jpeg, .jpg"
                  style={{ display: "none" }}
                />
                {/* {emoji && <div className="selected_emojis">{emoji}</div>} */}
              </label>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              {/* <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div> */}
              <div className="shareOption">
                <button
                  type="button"
                  // onClick={() => setOpenEmoji(true)}
                  className="btn button_emoji_picker"
                >
                  <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                  <span className="shareOptionText">Feelings</span>
                </button>
              </div>
            </div>
            {/* <div
              className={openEmoji === true ? "d-block get_emojis" : "d-none"}
            >
              <Cancel onClick={() => setOpenEmoji(false)} />
              <EmojiPicker
                {...register("file")}
                onEmojiClick={(e) => {
                  setEmoji(e.emoji);
                  setOpenEmoji(false);
                }}
              />
            </div> */}
            <button type="submit" className="shareButton">
              Share
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

const schema = yup.object().shape({
  text: yup.string(),
  location: yup.string(),
  likes: yup.string(),
  emoji: yup.string(),
});
