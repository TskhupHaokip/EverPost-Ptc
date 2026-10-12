import { useState } from "react";
import ApiClient from "../../ApiClient";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const LoginForm = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await ApiClient.post("/api/login/", {
        username: UserName,
        password: Password,
      });
      const data = res.data;
      
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);

      console.log(res)
      console.log("Access",localStorage.getItem(ACCESS_TOKEN))
      console.log("refresh",localStorage.getItem(REFRESH_TOKEN))

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 justify-center items-center border-base-300 text-lg rounded-box w-lg border p-4">
      <legend className="fieldset-legend">Login</legend>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-1"
      >
        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-neutral w-[40%] mt-4">
          Login
        </button>
      </form>
    </fieldset>
  );
};

export default LoginForm;
