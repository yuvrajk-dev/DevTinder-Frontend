import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, NavLink, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

      dispatch(removeUser());
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const closeDropdown = () => {
    document.activeElement?.blur();
  };

  return (
    <div className="navbar fixed top-0 z-50 bg-base-100 shadow-sm px-3 sm:px-5">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-semibold hover:opacity-80 transition-opacity"
        >
          <img
            src="/favicon.png"
            alt="DevTinder logo"
            className="w-8 h-8 object-contain"
          />

          <span>DevTinder</span>
        </Link>
      </div>

      {user && (
        <div className="dropdown dropdown-end mr-1 sm:mr-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user.gender === "male"
                    ? "https://api.dicebear.com/10.x/adventurer/svg?seed=Milo"
                    : "https://api.dicebear.com/10.x/adventurer/svg?seed=Aneka"
                }
                alt={`${user.firstName}'s avatar`}
                className="w-full h-full rounded-full bg-base-200"
              />
            </div>
          </div>

          <ul
            tabIndex={-1}
            className="
    menu menu-sm dropdown-content
    bg-base-100 rounded-2xl
    z-50 p-4
    shadow-xl border border-base-300

    
    max-sm:fixed
    max-sm:left-2
    max-sm:right-2
    max-sm:top-20
    max-sm:w-auto
    max-sm:min-h-75

    sm:absolute
    sm:right-0
    sm:mt-4
    sm:w-56
"
          >
            <li className="pointer-events-none mb-2">
              <div className="flex flex-col items-start gap-1 py-3">
                <span className="font-bold text-base">
                  {user.firstName} {user.lastName}
                </span>

                <span className="text-xs opacity-60">Manage your account</span>
              </div>
            </li>

            <div className="divider my-1" />
            <li>
              <NavLink
                onClick={closeDropdown}
                className={({ isActive }) =>
                  isActive ? "bg-primary text-primary-content" : ""
                }
                to="/profile"
              >
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                end
                onClick={closeDropdown}
                className={({ isActive }) =>
                  isActive ? "bg-primary text-primary-content" : ""
                }
                to="/"
              >
                Feed
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeDropdown}
                className={({ isActive }) =>
                  isActive ? "bg-primary text-primary-content" : ""
                }
                to="/requests"
              >
                Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeDropdown}
                className={({ isActive }) =>
                  isActive ? "bg-primary text-primary-content" : ""
                }
                to="/network"
              >
                My Network
              </NavLink>
            </li>

            <li>
              <NavLink
                onClick={closeDropdown}
                className={({ isActive }) =>
                  isActive ? "bg-primary text-primary-content" : ""
                }
                to="/settings"
              >
                Settings
              </NavLink>
            </li>

            <div className="divider my-1" />

            <li>
              <button
                className="text-error hover:bg-error hover:text-error-content"
                onClick={handleLogout}
              >
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
