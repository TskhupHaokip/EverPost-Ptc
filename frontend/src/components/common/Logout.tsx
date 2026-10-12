import { Navigate } from "react-router-dom";
import ApiClient from "../../ApiClient";
import { REFRESH_TOKEN } from "../../constants";
import SignUp from "../forms/SignUp";


const ClientLogout = async () => {
  const rf_token = localStorage.getItem(REFRESH_TOKEN);

  if (!rf_token) return false;

  try {
    const res = await ApiClient.post("/api/users/logout/", {
      refresh: rf_token,
    });
    if (res.status == 200) {
      localStorage.clear();
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const Logout = () => {

  ClientLogout()
  
  return <Navigate to="/login" />;
};


export const RegisterLogout = () => {
  ClientLogout()
  return <SignUp />;
};
