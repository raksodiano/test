import jwt from "jwt-decode";

export const getEmail = (token) => {
  const decode = jwt_decode(token) 
  return { ...decode };
};
