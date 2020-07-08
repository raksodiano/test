export const URL = `http://localhost:8000/api`;

export const LOGIN_URL = `${URL}/login_check`;
export const REGISTER_URL = `${URL}/register`;
export const RECHARGE_URL = `${URL}/recharge_wallet`;
export const PAYMENT_URL = `${URL}/payment`;
export const CONFIRM_PAYMENT_URL = `${URL}/confirm_payment`;
export const CHECK_BALANCE_URL = `${URL}/check_balance`;

export const HEADERS = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Accept": "application/json",
  "Content-type": "application/json",
});