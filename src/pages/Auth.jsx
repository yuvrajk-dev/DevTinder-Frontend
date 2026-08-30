import React, { useEffect, useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const value = localStorage.getItem("isLogin");
    return value === null || value === "true";
  });
  const switchMode = () => {
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <div className="min-h-screen border flex items-center justify-center pt-16 pb-10">
      {isLogin ? (
        <Login switchMode={switchMode} />
      ) : (
        <Signup switchMode={switchMode} />
      )}
    </div>
  );
};

export default Auth;
