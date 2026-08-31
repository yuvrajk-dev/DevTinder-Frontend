import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/network`, {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  const connectedCount =
    connections?.filter((connection) => connection.status === "accepted")
      .length || 0;

  const pendingCount =
    connections?.filter((connection) => connection.status === "interested")
      .length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        {" "}
        <span className="loading loading-infinity loading-xl"></span>{" "}
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="card bg-base-200 border border-base-300 shadow-xl w-full max-w-md">
          <div className="card-body text-center items-center py-10">
            <div className="text-5xl mb-2">🤝</div>
            <h2 className="card-title text-2xl">Your Network is Empty</h2>
            <p className="text-sm opacity-60">
              Start connecting with developers and build your network.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Your Network</h1>
            <p className="text-sm sm:text-base opacity-60 mt-2">
              Developers you've connected with and requests you're waiting on.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-success badge-lg gap-2">
              {connectedCount}
              <span className="hidden sm:inline">Connected</span>
            </div>

            {pendingCount > 0 && (
              <div className="badge badge-warning badge-lg gap-2">
                {pendingCount}
                <span className="hidden sm:inline">Pending</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {connections.map((connection) => (
            <div
              key={connection._id}
              className="
            card
            bg-base-200
            border border-base-300
            shadow-md
            transition-all duration-300
            hover:shadow-xl
            hover:-translate-y-1
          "
            >
              <div className="card-body p-5">
                <div className="flex gap-4 sm:gap-5">
                  <div className="avatar shrink-0">
                    <div className="w-16 sm:w-20 rounded-2xl bg-base-300">
                      <img
                        src={
                          connection.gender === "male"
                            ? "https://api.dicebear.com/10.x/adventurer/svg?seed=Milo"
                            : "https://api.dicebear.com/10.x/adventurer/svg?seed=Aneka"
                        }
                        alt={`${connection.firstName} avatar`}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <h2 className="font-bold text-xl sm:text-2xl">
                            {connection.firstName} {connection.lastName}
                          </h2>

                          {connection.status === "accepted" ? (
                            <span className="badge badge-success badge-sm shrink-0">
                              Connected
                            </span>
                          ) : (
                            <span className="badge badge-warning badge-sm shrink-0">
                              Pending
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm opacity-60">
                            {connection.age} years old
                          </span>

                          <span className="opacity-30">•</span>

                          <span className="text-sm opacity-60 capitalize">
                            {connection.gender}
                          </span>
                        </div>
                      </div>
                    </div>

                    {connection.bio && (
                      <p className="text-sm sm:text-base opacity-70 mt-4 leading-relaxed">
                        {connection.bio}
                      </p>
                    )}

                    {connection.skills?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-wider opacity-50 mb-2">
                          Skills
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {connection.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="badge badge-primary badge-outline"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
