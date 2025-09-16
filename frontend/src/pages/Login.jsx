import React, { useState, useEffect } from "react";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setError, clearError } from "../store/authSlice.js";

const Login = ({ error: sessionError }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/landing");
    }
  }, [user, navigate]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error if the field is emptied
    if (error) {
        dispatch(clearError());
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        dispatch(setError("Please enter a valid email address"));
      return;
    }

    if (formData.password.length < 8) {
        dispatch(setError("Password must be at least 8 characters long"));
      return;
    }

    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex px-9 py-10 items-start md:items-center justify-center bg-blue-950/15">
      <div className="bg-white/55 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-sky-900">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sky-900 text-md font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 py-2 bg-slate-500/10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-950"
                autoComplete="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sky-900 text-md font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 bg-slate-500/10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-950"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600/80 text-white mt-5 py-3 rounded-lg font-semibold text-lg hover:bg-sky-950/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="flex flex-col items-center md:flex-row justify-between gap-2 sm:gap-0">
            <Link
              to="/register"
              className="text-sm text-gray-600 hover:underline"
            >
              <p className="text-sm text-gray-600 text-center">
                New User? Register here
              </p>
            </Link>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
