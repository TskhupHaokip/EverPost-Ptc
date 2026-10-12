import { useState, type FormEvent } from "react";
import { Link } from "@mui/material";
import SignupBanner from "./SignupBanner";
import AppLogo from "./AppLogo";
import ApiClient from "../../ApiClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";


export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (username && password) {
      try {
        await ApiClient.post("/api/users/register/", {
          username: username,
          password: password,
        });

        setToastMessage("Welcome! " + username);
        setShowToast(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.detail ||
              err.response?.data?.username?.[0] ||
              err.response?.data?.password?.[0] ||
              "Registration failed. Please try again.",
          );
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          status={true}
        />
      )}

      <div className="flex flex-1 gap-4 p-3">
        <fieldset className="flex w-full flex-none flex-col items-center rounded-2xl bg-slate-950 p-5 md:w-[30%]">
          <legend className="px-4 text-2xl font-bold text-sky-400">
            Register
          </legend>

          <h1 className="mb-5 text-center text-sm text-slate-400">
            Please register with the correct details!
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-5 rounded-2xl bg-slate-900 p-6"
          >
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-semibold text-slate-200"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-200"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-slate-200"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98]"
            >
              Register
            </button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                underline="hover"
                sx={{ fontWeight: 600, color: "#38bdf8" }}
              >
                Login
              </Link>
            </p>
          </form>

          <div className="mt-2">
            <AppLogo />
          </div>
        </fieldset>

        <SignupBanner />
      </div>
    </>
  );
}
