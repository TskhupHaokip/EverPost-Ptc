import { Navigate } from "react-router-dom"
import Register from "../../pages/Register"


export const Logout = () => {
  localStorage.clear()
  return <Navigate to="/login" />

}

export const RegisterLogout = () => {
    localStorage.clear()
    return < Register/>

}