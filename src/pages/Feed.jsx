import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (feed?.length === 1) {
      getFeed();
    }
  }, [feed?.length]);
  useEffect(() => {
    getFeed();
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="card bg-base-200 border border-base-300 shadow-xl w-96">
          <div className="card-body text-center items-center">
            <h2 className="card-title text-2xl">No Developers Found</h2>

            <p className="opacity-70">
              You've seen everyone for now. Check back later to discover more
              developers!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex p-4 justify-center items-center">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
