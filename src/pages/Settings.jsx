import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );

      setMessage(res.data.message);
      setIsError(false);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Something went wrong.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-27 px-4 flex justify-center ">
      <div className="card w-full max-w-md bg-base-200 shadow-xl border border-base-300 h-fit">
        <div className="card-body">
          <div className="mb-4">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-base-content/60">Manage your account security</p>
          </div>

          <div className="divider">CHANGE PASSWORD</div>

          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <div>
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter your current password"
                className="input input-bordered w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">New Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter your new password"
                className="input input-bordered w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>

              <input
                type="password"
                placeholder="Confirm your new password"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <div
                className={`alert ${isError ? "alert-error" : "alert-success"}`}
              >
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
