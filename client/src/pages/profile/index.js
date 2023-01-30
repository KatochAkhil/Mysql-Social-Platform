import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../common/sidebar";
import Feed from "../../components/feed";
import Rightbar from "../../components/rightbar";
import "./profile.css";
import { getUserprofile } from "../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { getprofile } from "../../redux/action";

export default function Profile() {
  const [value, setValue] = useState(1);

  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"));

  const fetchProfile = async () => {
    await axios
      .get(getUserprofile(userId?.userId))
      .then((res) => {
        dispatch(getprofile(res.data));
      })
      .catch((err) => console.log(err));
  };

  console.log(userId);

  useEffect(() => {
    fetchProfile();
  }, []);

  const userdata = useSelector((state) => state.data);

  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
                alt="person-profile"
              />
              <img
                className="profileUserImg"
                src={
                  `${process.env.REACT_APP_IMAGE_URL}/${userdata?.profile?.profileData?.profilePicture}` ||
                  "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=740"
                }
                alt="profileUser"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userdata?.profile?.name}</h4>
              <span className="profileInfoDesc">Believe In yourself</span>
            </div>
          </div>
          <div className="profileTabs">
            <div className="container">
              <div className="row text-center">
                <div className="col-md-4">
                  <button
                    className={value === 1 ? "active_btn btn" : "btn"}
                    onClick={() => setValue(1)}
                  >
                    About
                  </button>
                </div>
                <div className="col-md-4">
                  <button
                    className={value === 2 ? "active_btn btn" : "btn"}
                    onClick={() => setValue(2)}
                  >
                    Posts
                  </button>
                </div>
                <div className="col-md-4">
                  <button
                    className={value === 3 ? "active_btn btn" : " btn "}
                    onClick={() => setValue(3)}
                  >
                    Friends
                  </button>
                </div>
              </div>
              <div className="row">
                <div className={value === 1 ? "col-md-12" : "d-none"}>
                  <div className="abouts">
                    <ul className="list-group">
                      <li className="list-group-item">
                        Gender : {userdata?.profile?.profileData?.gender}
                      </li>
                      <li className="list-group-item">
                        Date of Birth :{" "}
                        {userdata?.profile?.profileData?.dateOfBirth}
                      </li>
                      <li className="list-group-item">
                        Profession :{" "}
                        {userdata?.profile?.profileData?.profession}
                      </li>
                      <li className="list-group-item">
                        RelationShip :
                        {userdata?.profile?.profileData?.relationShip}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={value === 2 ? "col-md-12" : "d-none"}>
                  <div className="posts">Posts</div>
                </div>
                <div className={value === 3 ? "col-md-12" : "d-none"}>
                  <div className="friends">Friends</div>
                </div>
              </div>
            </div>
          </div>

          <div className="profileRightBottom">
            <Feed />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}
