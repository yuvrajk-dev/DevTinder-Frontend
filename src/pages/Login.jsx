import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmail] = useState("Yuvraj@gmail.com");
  const [password, setPassword] = useState("Yuvraj@120");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    if (isLoading) return;
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
    <div className="min-h-screen  items-center justify-center pt-20 flex ">
      <fieldset className="fieldset  bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-3xl ">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={emailId}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
        />

        <label className="label">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          value={password}
          type="password"
          className="input"
          placeholder="Password"
        />

        {errorMessage && (
          <span className=" pl-1 text-red-400">{errorMessage}</span>
        )}
        <button
          disabled={isLoading}
          className="btn btn-neutral mt-4"
          onClick={handleLogin}
        >
          {isLoading ? (
            <span className="loading loading-infinity loading-xs"></span>
          ) : (
            "Login"
          )}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
