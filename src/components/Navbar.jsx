import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, NavLink, useNavigate } from "react-router";
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
    <div className="navbar z-999 bg-base-100 shadow-sm top-0 fixed">
      <div className="flex-1 ">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
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
              <NavLink
                onClick={() => document.activeElement?.blur()}
                className={({ isActive }) => (isActive ? "bg-black/20" : "")}
                to={"/"}
              >
                Home
                {/* <span className="badge">New</span> */}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => document.activeElement?.blur()}
                className={({ isActive }) => (isActive ? "bg-black/20" : "")}
                to={"/profile"}
              >
                Profile
                {/* <span className="badge">New</span> */}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => document.activeElement?.blur()}
                className={({ isActive }) => (isActive ? "bg-black/20" : "")}
                to={"/settings"}
              >
                Settings
              </NavLink>
            </li>
            <li className=" p-0">
              <button className="w-full " onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
