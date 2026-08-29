import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmail] = useState("Yuvraj@gmail.com");
  const [password, setPassword] = useState("Yuvraj@120");
  const handleLogin = async () => {
    try {
      axios.post(
        "http://localhost:3000/login",
        { emailId, password },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  items-center justify-center pt-20 flex border">
      <fieldset className="fieldset  bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-3xl">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={emailId}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label className="label">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          className="input"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
