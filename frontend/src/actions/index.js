import axios from "axios";
import {
  OPEN_SNACKBARS,
  CLOSE_SNACKBARS,
  SET_STATE,
  USER_SESSION,
  SIGN_OFF,
} from "../constants/reducers";
import {
  LOGIN_URL,
  REGISTER_URL,
  CHECK_BALANCE_URL,
  RECHARGE_URL,
  PAYMENT_URL,
  CONFIRM_PAYMENT_URL,
  HEADERS,
} from "../constants/urls";
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
      const user = JSON.stringify(res.data);
      localStorage.setItem("user", user);
      const token = JSON.parse(user).token;
      const email = getEmail(token);
      console.log("login", email);
      
      dispatch(
        setUser({
          username: email.username,
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

export const checkBalance = (values, callback) => (dispatch) => {
  axios({
    method: "post",
    url: CHECK_BALANCE_URL,
    data: { ...values },
    headers: HEADERS,
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      dispatch(openSnackbars("error", "no se ha podido traer la informacion"));
    });
};

export const rechargeWallet = (values, callback) => (dispatch) => {
  axios({
    method: "post",
    url: RECHARGE_URL,
    data: { ...values },
    headers: HEADERS,
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      dispatch(openSnackbars("error", "no se ha podido traer la informacion"));
    });
};

export const payment = (values, callback) => (dispatch) => {
  axios({
    method: "post",
    url: PAYMENT_URL,
    data: { ...values },
    headers: HEADERS,
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      dispatch(openSnackbars("error", "no se ha podido traer la informacion"));
    });
};

export const confirmPayment = (values, callback) => (dispatch) => {
  axios({
    method: "post",
    url: CONFIRM_PAYMENT_URL,
    data: { ...values },
    headers: HEADERS,
  })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      dispatch(openSnackbars("error", "no se ha podido traer la informacion"));
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
  
  if (user) {
    const token = JSON.parse(user).token;
    const email = getEmail(token).email;
    console.log("verify", email);
    dispatch(
      setUser({
        username: email.username,
        logout: true,
      })
    );
  }
};
