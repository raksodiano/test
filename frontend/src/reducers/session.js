import {
  OPEN_SNACKBARS,
  CLOSE_SNACKBARS,
  SET_STATE,
  USER_SESSION,
  SIGN_OFF,
} from "../constants/reducers";

const setData = (state, node, values) => (state = { state, node, values });

const initalState = {
  snackBars: {
    type: "success",
    message: "",
    open: false,
  },
};

const sessionReducer = (state = initalState, { type, payload }) => {

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

    case SET_STATE: {
      return state;
    }

    case SIGN_OFF: {
      return initalState;
    }

    default:
      return state;
  }
};

export default sessionReducer;
