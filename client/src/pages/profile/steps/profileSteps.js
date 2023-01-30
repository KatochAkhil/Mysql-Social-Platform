import React, { useState } from "react";
import "../profile.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postProfileData } from "../../../utils/endpoints";
import { useDispatch } from "react-redux";
import { createNotification } from "../../../common/createNotifactions";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

function ProfileSteps() {
  const [tabs, settabs] = useState(1);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const formSubmit = async (e) => {
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("userId", user?.userId);
    formdata.append("gender", e.gender);
    formdata.append("dateOfBirth", e.dateOfBirth);
    formdata.append("relationShip", e.relationShip);
    formdata.append("profession", e.profession);

    await axios
      .post(postProfileData, formdata)
      .then((res) => {
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="steps_profile">
      <div className="container">
        <div className="inner_box">
          <div className="content">
            <h1 className="text-center">
              Complete Your Profile to See Best in the world
            </h1>
            <form onSubmit={handleSubmit(formSubmit)} className="form-group">
              <div className="First_tab">
                <div
                  className={tabs === 1 ? "select_profile_Picture" : "d-none"}
                >
                  {file ? (
                    <div>
                      {file && (
                        <div className="profile_file">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="profilePicture"
                            className="shareImg"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <label htmlFor="file" className="label_image">
                      <div className="middle_label text-center">
                        <ControlPointIcon />
                        <p>Select your Profile Picture</p>
                        <input
                          id="file"
                          type="file"
                          className="d-none"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                    </label>
                  )}
                  <button
                    className="btn btn_next"
                    type="button"
                    onClick={() => settabs(2)}
                  >
                    Next
                  </button>
                </div>
                <div className={tabs === 2 ? "details_profile" : "d-none"}>
                  <div className="row">
                    <div className="col-md-12">
                      <select
                        className="custom-select"
                        id="inputGroupSelect01"
                        {...register("gender")}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="date"
                        {...register("dateOfBirth")}
                        className="form-input"
                        // defaultValue={new Date()}
                      />
                    </div>

                    <div className="col-md-12">
                      <select
                        className="custom-select"
                        id="inputGroupSelect01"
                        {...register("relationShip")}
                      >
                        <option disabled>RelationShip</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="Profession"
                        {...register("profession")}
                        className="form-input"
                      />
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="btn btn_next">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSteps;

const schema = yup.object().shape({
  gender: yup.string().required("This Field is Required"),
  dateOfBirth: yup.string().required("This Field is Required"),
  relationShip: yup.string().required("This Field is Required"),
  profession: yup.string().required("This Field is Required"),
});
