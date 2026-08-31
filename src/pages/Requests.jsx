import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const requests = useSelector((store) => store.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewRequest = async (status, requestId) => {
    try {
      setLoadingId({ requestId, status });

      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        },
      );
      await fetchRequest();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    const loadRequests = async () => {
      try {
        await fetchRequest();
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="card bg-base-200 border border-base-300 shadow-xl w-full max-w-md">
          <div className="card-body text-center items-center py-10">
            <div className="text-5xl mb-2">🤝</div>

            <h2 className="card-title text-2xl">No Requests Yet</h2>

            <p className="text-sm opacity-60">
              When developers send you connection requests, they'll appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Connection Requests
            </h1>

            <p className="text-sm sm:text-base opacity-60 mt-2">
              Developers who want to connect with you.
            </p>
          </div>

          <div className="badge badge-primary badge-lg">{requests.length}</div>
        </div>

        <div className="flex flex-col gap-4">
          {requests.map((request) => {
            const user = request.fromUserId;

            return (
              <div
                key={request._id}
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
                            user.gender === "male"
                              ? "https://api.dicebear.com/10.x/adventurer/svg?seed=Milo"
                              : "https://api.dicebear.com/10.x/adventurer/svg?seed=Aneka"
                          }
                          alt={`${user.firstName} avatar`}
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-xl sm:text-2xl truncate">
                        {user.firstName} {user.lastName}
                      </h2>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm opacity-60">
                          {user.age} years old
                        </span>

                        <span className="opacity-30">•</span>

                        <span className="text-sm opacity-60 capitalize">
                          {user.gender}
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm sm:text-base opacity-70 mt-4 leading-relaxed">
                          {user.bio}
                        </p>
                      )}

                      {user.skills?.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-wider opacity-50 mb-2">
                            Skills
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill, index) => (
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

                      <div className="flex gap-3 mt-5">
                        <button
                          className="btn btn-success btn-sm flex-1"
                          disabled={loadingId?.requestId === request._id}
                          onClick={() =>
                            handleReviewRequest("accepted", request._id)
                          }
                        >
                          {loadingId?.requestId === request._id &&
                          loadingId?.status === "accepted" ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            "Accept"
                          )}
                        </button>

                        <button
                          className="btn btn-outline btn-error btn-sm flex-1"
                          disabled={loadingId?.requestId === request._id}
                          onClick={() =>
                            handleReviewRequest("rejected", request._id)
                          }
                        >
                          {loadingId?.requestId === request._id &&
                          loadingId?.status === "rejected" ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            "Reject"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
