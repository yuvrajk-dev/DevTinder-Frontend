import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.feed;
  });

  const getFeed = async () => {
    if (user && user.length > 0) {
      setIsLoaded(true);
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <UserCard user={user[0]} />
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

export default Feed;
