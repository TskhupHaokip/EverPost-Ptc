import { useState } from "react";
import ApiClient from "../../ApiClient";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import Toast from "../common/Toast";
import { Title } from "../../utils/util";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
 
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await ApiClient.post("/api/login/", {
        username: UserName,
        password: Password,
      });

      const data = res.data;

      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);

      setToastMessage(`Welcome! ${Title(UserName)}`);
      setToastStatus(true);
      setShowToast(true);
    

      // Navigate after the toast has had time to display.
      setTimeout(() => navigate("/home"), 1500);
    } catch (error: unknown) {
      let message = "Login failed. Please try again.";

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        message =
          typeof responseData === "string"
            ? responseData
            : responseData?.detail ??
              responseData?.message ??
              message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setToastMessage(message);
      setToastStatus(false);
      setShowToast(true);
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          status={toastStatus}
        />
      )}

      <fieldset className="fieldset bg-base-200 justify-center items-center border-base-300 text-lg rounded-box w-lg border p-4">
        <legend className="fieldset-legend">Login</legend>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-1"
        >
          <label className="label">Username</label>
          <input
            type="text"
            className="input"
            placeholder="Username"
            required
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-neutral w-[40%] mt-4"
          >
            Login
          </button>
        </form>
      </fieldset>
    </>
  );
};

export default LoginForm;
