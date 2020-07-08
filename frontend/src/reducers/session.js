import {
  OPEN_SNACKBARS,
  CLOSE_SNACKBARS,
  SET_STATE,
  USER_SESSION,
  SIGN_OFF,
} from "../constants/reducers";

const setData = (state, node, payload) => (state = { ...state, node, payload });

const initalState = {
  payload: {
    logout: false,
    username: ''
  },
  snackBars: {
    type: "success",
    message: "",
    open: false,
  },
};

const session = (state = initalState, { type, payload }) => {

  switch (type) {
    case OPEN_SNACKBARS: {
      return setData(state, "snackBars", payload);
    }

    case CLOSE_SNACKBARS: {
      return setData(state, "snackBars", payload);
    }

    case USER_SESSION: {
      return setData(state, "sesionUser", payload);
    }

    case SIGN_OFF: {
      return initalState;
    }

    case SET_STATE:
    default:
      return state;
  }
};

export default session;
