import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = ({ switchMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;

    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[95vw] max-w-md border p-5 sm:p-6">
      <legend className="fieldset-legend text-3xl">Login</legend>

      <label className="label">Email</label>

      <input
        type="email"
        className="input w-full"
        value={emailId}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorMessage("");
        }}
      />

      <label className="label">Password</label>

      <input
        value={password}
        type="password"
        className="input w-full"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorMessage("");
        }}
      />

      {errorMessage && (
        <div className="alert alert-error mt-2 w-full">
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        disabled={isLoading}
        className="btn btn-neutral mt-4 w-full"
        onClick={handleLogin}
      >
        {isLoading ? (
          <span className="loading loading-infinity loading-xs"></span>
        ) : (
          "Login"
        )}
      </button>

      <div className="mt-4 text-center">
        <span className="text-sm">New here? </span>

        <button onClick={switchMode} className="link link-primary text-sm">
          Create an account
        </button>
      </div>
    </fieldset>
  );
};

export default Login;
