import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navButton =
  "px-2 md:px-4 py-2 rounded border border-transparent transition-colors " +
  "md:hover:border-orange-500 md:hover:ring-1 md:hover:ring-orange-500 hover:outline-none";

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="bg-gray-800 text-white h-16 flex justify-between md:justify-between items-center px-4">
      <div className="flex items-center space-x-2">
        <UserCircleIcon className="h-6 w-6 text-gray-500" />
        <h1 className="text-lg font-bold whitespace-nowrap">Employee</h1>
      </div>
      <div className="flex space-x-1 sm:space-x-3 md:space-x-6">
        <button
          onClick={() => navigate("/")}
          className={navButton}
          >
          Home
        </button>
        {user ? (
          <button
            onClick={handleLogout}
            className={navButton}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className={navButton}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className={navButton}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
