import jwt from "jwt-decode";

export const getEmail = () => {
  const user = localStorage.getItem("user");
  console.log("user", user);
  
  return { email: jwt(user) };
};
