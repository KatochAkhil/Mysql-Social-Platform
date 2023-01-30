import React from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import "./register.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../../../utils/endpoints";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../../redux/action";
import { createNotification } from "../../../common/createNotifactions";

function Register() {
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

  const formSubmit = async (e) => {
    await axios
      .post(registerUser, e)
      .then((res) => {
        dispatch(registerUserAction(res.data));
        createNotification("success", "Success", "user Register Successfull");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(e);
  };

  return (
    <div className="container p-4">
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
                Register to experience the Best in the World
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
                      label="Name"
                      {...register("name")}
                      variant="outlined"
                      error={!!errors?.name?.message}
                      helperText={
                        errors?.name?.message && <p>{errors?.name?.message}</p>
                      }
                    />
                  </Box>
                </Grid>
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
                      fullWidth
                      id="outlined-basic"
                      label="Phone Number"
                      {...register("phone")}
                      variant="outlined"
                      error={!!errors?.phone?.message}
                      helperText={
                        errors?.phone?.message && (
                          <p>{errors?.phone?.message}</p>
                        )
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box m={2}>
                    <TextField
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
                    <Button type="submit" fullWidth variant="contained">
                      Register
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Typography textAlign="right">
                    Already a Member <Link to="/login">Login Now</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;

const schema = yup.object().shape({
  name: yup.string().required("This Field is Required"),
  email: yup.string().email().required("This Field is Required"),
  password: yup
    .string()
    .required("This Field is Required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Please provide a valid Password."
    ),
  phone: yup.number().required("This Field is Required"),
});
