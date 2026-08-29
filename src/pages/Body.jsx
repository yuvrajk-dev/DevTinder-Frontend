import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRedux = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      if (user.data.data) {
        dispatch(addUser(user.data.data));
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.log(err);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!userRedux) {
      fetchUser();
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (isLoaded) {
    return (
      <div className="min-h-screen relative flex flex-col">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }
};

export default Body;
