import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/connections`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="min-h-screen  flex items-center justify-center pt-16 pb-10">
        Connections
      </div>
    </>
  );
};

export default Connections;
