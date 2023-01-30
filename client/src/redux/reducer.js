import { LOGIN, REGISTER, SHARE_POST, USER_PROFILE } from "./constant";

const initState = {
  login: {},
  posts: [],
  profile: {},
};

export const mainReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        login: { ...payload },
      };
    case REGISTER:
      return {
        ...state,
      };
    case SHARE_POST:
      return {
        ...state,
        posts: { ...payload },
      };
    case USER_PROFILE:
      return {
        ...state,
        profile: {...payload},
      };
    default:
      return state;
  }
};
