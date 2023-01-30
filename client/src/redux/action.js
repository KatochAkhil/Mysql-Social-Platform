import { LOGIN, REGISTER, SHARE_POST, USER_PROFILE } from "./constant";

export const login = (user) => async (dispatch) => {
  dispatch({ type: LOGIN, payload: user });
};

export const registerUserAction = (user) => async (dispatch) => {
  dispatch({ type: REGISTER, payload: user });
};

export const sharePost = (data) => async (dispatch) => {
  dispatch({ type: SHARE_POST, payload: data });
};

export const getUsersPosts = (data) => async (dispatch) => {
  dispatch({ type: SHARE_POST, payload: data });
};

export const getprofile = (data) => async (dispatch) => {
  dispatch({ type: USER_PROFILE, payload: data });
};
