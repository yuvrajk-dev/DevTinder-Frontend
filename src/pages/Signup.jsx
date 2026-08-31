import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Signup = ({ switchMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    bio: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setErrorMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (formData.firstName.trim().length < 4) {
      newErrors.firstName = "First name must be at least 4 characters.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (formData.lastName.trim().length < 4) {
      newErrors.lastName = "Last name must be at least 4 characters.";
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email is required.";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (Number(formData.age) < 18) {
      newErrors.age = "You must be at least 18 years old.";
    } else if (Number(formData.age) > 100) {
      newErrors.age = "Please enter a valid age.";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required.";
    } else if (formData.bio.trim().length < 10) {
      newErrors.bio = "Bio must be at least 10 characters.";
    } else if (formData.bio.trim().length > 300) {
      newErrors.bio = "Bio cannot exceed 300 characters.";
    }

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skillsArray.length < 2) {
      newErrors.skills = "At least two skills are required.";
    } else if (skillsArray.length > 5) {
      newErrors.skills = "You can add a maximum of 5 skills.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setErrorMessage("");
    if (isLoading) return;

    setIsLoading(true);

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const signupData = {
        ...formData,
        bio: formData.bio.trim(),
        skills: skillsArray,
      };

      const res = await axios.post(`${BASE_URL}/signup`, signupData, {
        withCredentials: true,
      });

      console.log(res.data);

      dispatch(addUser(res.data.data));

      navigate("/");
    } catch (err) {
      console.log(err);

      const data = err.response?.data;

      if (data?.errors) {
        const backendErrors = {};

        Object.keys(data.errors).forEach((key) => {
          backendErrors[key] = data.errors[key].message;
        });

        setErrors(backendErrors);

        return;
      }

      setErrorMessage(data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-[95vw] max-w-md sm:w-[90vw] sm:max-w-lg border p-5 sm:p-6">
      <legend className="fieldset-legend text-3xl">Create Account</legend>

      <div className="flex gap-2">
        <div className="flex-1 min-w-0">
          <label className="label">First Name</label>

          <input
            type="text"
            name="firstName"
            className={`input w-full ${errors.firstName ? "input-error" : ""}`}
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          {errors.firstName && (
            <span className="text-error text-sm">{errors.firstName}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <label className="label">Last Name</label>

          <input
            type="text"
            name="lastName"
            className={`input w-full ${errors.lastName ? "input-error" : ""}`}
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />

          {errors.lastName && (
            <span className="text-error text-sm">{errors.lastName}</span>
          )}
        </div>
      </div>

      <label className="label">Email</label>

      <input
        type="email"
        name="emailId"
        className={`input w-full ${errors.emailId ? "input-error" : ""}`}
        placeholder="Email"
        value={formData.emailId}
        onChange={handleChange}
      />

      {errors.emailId && (
        <span className="text-error text-sm">{errors.emailId}</span>
      )}

      <div className="flex gap-2">
        <div className="flex-1 min-w-0">
          <label className="label">Age</label>

          <input
            type="text"
            name="age"
            className={`input w-full ${errors.age ? "input-error" : ""}`}
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />

          {errors.age && (
            <span className="text-error text-sm">{errors.age}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <label className="label">Gender</label>

          <select
            name="gender"
            className={`select w-full ${errors.gender ? "select-error" : ""}`}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              Gender
            </option>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {errors.gender && (
            <span className="text-error text-sm">{errors.gender}</span>
          )}
        </div>
      </div>

      <label className="label">Bio</label>

      <textarea
        name="bio"
        className={`textarea w-full resize-none ${
          errors.bio ? "textarea-error" : ""
        }`}
        placeholder="Tell us about yourself..."
        value={formData.bio}
        onChange={handleChange}
        rows="1"
      />

      {errors.bio && <span className="text-error text-sm">{errors.bio}</span>}

      <label className="label">Skills (Maximum 5)</label>

      <input
        type="text"
        name="skills"
        className={`input w-full ${errors.skills ? "input-error" : ""}`}
        placeholder="React, Node.js, MongoDB..."
        value={formData.skills}
        onChange={handleChange}
      />

      {errors.skills && (
        <span className="text-error text-sm">{errors.skills}</span>
      )}

      <label className="label">Password</label>

      <input
        type="password"
        name="password"
        className={`input w-full ${errors.password ? "input-error" : ""}`}
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      {errors.password && (
        <span className="text-error text-sm">{errors.password}</span>
      )}

      {errorMessage && (
        <div className="alert alert-error mt-2">
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        disabled={isLoading}
        className="btn btn-neutral mt-4 w-full"
        onClick={handleSignup}
      >
        {isLoading ? (
          <span className="loading loading-infinity loading-xs"></span>
        ) : (
          "Create Account"
        )}
      </button>

      <div className="mt-4 text-center">
        <span className="text-sm">Already have an account? </span>

        <button onClick={switchMode} className="link link-primary text-sm">
          Login
        </button>
      </div>
    </fieldset>
  );
};

export default Signup;
