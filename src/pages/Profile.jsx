import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasChanges =
    firstName !== user?.firstName ||
    lastName !== user?.lastName ||
    String(age) !== String(user?.age) ||
    gender !== user?.gender;

  const handleChanges = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,

        {
          firstName,
          lastName,
          age,
          gender,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      setErrorMessage("");
      setSuccessMessage(res.data.message);
    } catch (err) {
      console.log(err);

      setSuccessMessage("");
      setErrorMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-3xl">Edit Profile</legend>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setSuccessMessage("");
            setErrorMessage("");
          }}
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setSuccessMessage("");
            setErrorMessage("");
          }}
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={user?.emailId || ""}
          disabled
        />

        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setSuccessMessage("");
            setErrorMessage("");
          }}
        />

        <label className="label">Gender</label>
        <select
          className="select"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            setSuccessMessage("");
            setErrorMessage("");
          }}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {successMessage && (
          <span className=" pl-1 text-green-400">{successMessage}</span>
        )}
        {errorMessage && (
          <span className=" pl-1 text-red-400">{errorMessage}</span>
        )}
        <button
          disabled={isLoading || !hasChanges}
          onClick={handleChanges}
          className="btn btn-neutral mt-4"
        >
          {isLoading ? (
            <span className="loading loading-infinity loading-xs"></span>
          ) : (
            "Save Changes"
          )}
        </button>
      </fieldset>
    </div>
  );
};

export default Profile;
