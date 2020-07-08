import axios from "axios";
import {
  OPEN_SNACKBARS,
  CLOSE_SNACKBARS,
  SET_STATE,
  USER_SESSION,
  SIGN_OFF,
} from "../constants/reducers";
import { LOGIN_URL, REGISTER_URL, HEADERS } from "../constants/urls";
import { getEmail } from "../helpers";

const setUser = (payload) => ({
  type: USER_SESSION,
  payload,
});

export const setState = () => {
  return {
    type: SET_STATE,
  };
};

export const login = (values) => (dispatch) => {
  axios({
    method: "post",
    url: LOGIN_URL,
    data: { ...values },
    headers: HEADERS,
  })
    .then((res) => {
      console.log(res.data.token);
      
      localStorage.setItem("user", res.data);

      dispatch(
        setUser({
          ...res.data,
          logout: true,
        })
      );
    })
    .catch((err) => {
      dispatch(openSnackbars("error", "Usuario o contraseña incorrecta"));
    });
};

export const register = (values, callback) => (dispatch) => {
  axios({
    method: "post",
    url: REGISTER_URL,
    data: { ...values },
    headers: HEADERS,
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      dispatch(openSnackbars("error", "Usuario Existente"));
    });
};

export const signOff = () => {
  localStorage.removeItem("user");
  return {
    type: SIGN_OFF,
  };
};

export const openSnackbars = (type, message) => {
  return {
    type: OPEN_SNACKBARS,
    payload: {
      type,
      message,
      open: true,
    },
  };
};

export const closeSnackbars = (values) => {
  return {
    type: CLOSE_SNACKBARS,
    payload: values,
  };
};

export const verify = () => (dispatch) => {
  const user = localStorage.getItem("user");
  console.log("algo", getEmail);
  
  if (user) {
    dispatch(
      setUser({
        ...user,
        logout: true,
      })
    );
  }
};
