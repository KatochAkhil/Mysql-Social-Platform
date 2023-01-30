import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../utils/endpoints";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/action";
import axios from "../../../utils/axios";
import AlertBox from "../../../common/Alert";
import { createNotification } from "../../../common/createNotifactions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const formSubmit = async (e) => {
    setLoading(true);
    try {
      await axios
        .post(loginUser, e)
        .then((res) => {
          dispatch(login(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
          createNotification("success", "Success", "Login Successfull");
          navigate("/steps");
        })
        .catch((err) => {
          console.log(err?.response?.data);
          createNotification("error", "Error", err?.response?.data);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="./images/profile.jpg" alt="" />
        </div>
        <div className="col-md-6">
          <Card className="form_section">
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="form_section">
                <img
                  className="logo"
                  src="./images/logo-black.png"
                  alt="logo"
                />
              </div>
              <Typography textAlign="center" fontSize="18px">
                Welcome Back
              </Typography>

              <Grid
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
                container
                spacing={2}
              >
                <Grid item xs={12}>
                  <Box m={2}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      {...register("email")}
                      error={!!errors?.email?.message}
                      helperText={
                        errors?.email?.message && (
                          <p>{errors?.email?.message}</p>
                        )
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box m={2}>
                    <TextField
                      type="password"
                      fullWidth
                      id="outlined-basic"
                      label="Password"
                      {...register("password")}
                      variant="outlined"
                      error={!!errors?.password?.message}
                      helperText={
                        errors?.password?.message && (
                          <p>{errors?.password?.message}</p>
                        )
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box m={2}>
                    <Button
                      style={{ backgroundColor: "#000" }}
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      {loading === true ? <CircularProgress /> : "Login"}
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Checkbox
                    aria-label="Rember me"
                    aria-labelledby="Rember Me"
                    defaultChecked
                  />
                  <Typography textAlign="left">
                    <Link to="/register">Forget Password?</Link>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box m={2}>
                    <Typography textAlign="right">
                      Not a Member? <Link to="/register">Register Now</Link>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Card>
        </div>
      </div>
      <AlertBox
        open={open}
        setOpen={setOpen}
        type={type}
        successMessage={errorMessage}
      />
    </div>
  );
}

export default Login;

const schema = yup.object().shape({
  email: yup.string().email().required("This Field is Required"),
  password: yup.string().required("This Field is Required"),
});
