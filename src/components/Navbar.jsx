import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-base-100 shadow-sm top-0 fixed">
      <div className="flex-1 ">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>

      {user && (
        <div className="dropdown dropdown-end mr-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li className=" py-2 pointer-events-none">
              <span className=" font-bold">
                {user.firstName + " " + user.lastName}
              </span>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/profile");
                }}
                className="justify-between"
              >
                Profile
                {/* <span className="badge">New</span> */}
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
