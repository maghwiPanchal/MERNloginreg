import React, { useState } from "react";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setError, clearError } from "../store/authSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const checkStrength = (password) => {
    if (password.length < 8) return "Too short";
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const checks = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean
    ).length;
    if (checks === 4) return "Strong";
    if (checks >= 2) return "Medium";
    return "Weak";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value === "") {
      dispatch(clearError());
    }
    if (name === "password") {
      setPasswordStrength(value ? checkStrength(value) : "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      dispatch(clearError());
      dispatch(setError("Please enter a valid email address"));
      return;
    }
    if (formData.password.length < 8) {
      dispatch(clearError());
      dispatch(setError("Password must be at least 8 characters long"));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      dispatch(clearError());
      dispatch(setError("Passwords do not match"));
      return;
    }

    // Format username before sending
    const formattedData = {
      ...formData,
      username:
        formData.username.charAt(0).toUpperCase() +
        formData.username.slice(1).toLowerCase(),
    };

    try {
      await dispatch(registerUser(formattedData)).unwrap();
      navigate("/landing");
    } catch (err) {
      // err could be string or object, normalize it
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Registration failed. Try again.";
      dispatch(setError(message));
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex px-9 py-7 items-start md:items-center justify-center bg-blue-950/15">
      <div className="bg-white/55 px-9 py-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-sky-900">
          Register
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sky-900 text-md font-medium mb-2"
            >
              Username
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 py-2 bg-slate-500/10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
                autoComplete="username"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sky-900 text-md font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

            {/* Password strength */}
            {formData.password && (
              <div className="mt-2">
                <div className="text-gray-500 text-sm mb-2">
                  Password must be at least 8 characters, include uppercase,
                  lowercase, number, and a special character.
                </div>
                <div className="w-full bg-gray-200 rounded h-2 mb-2">
                  <div
                    className={
                      `h-2 rounded transition-all duration-300 ` +
                      (passwordStrength === "Strong"
                        ? "bg-green-600 w-full"
                        : passwordStrength === "Medium"
                        ? "bg-yellow-400 w-2/3"
                        : "bg-red-600 w-1/3")
                    }
                  ></div>
                </div>
                <div
                  className={
                    "text-xs font-semibold " +
                    (passwordStrength === "Strong"
                      ? "text-green-600"
                      : passwordStrength === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600")
                  }
                >
                  Strength: {passwordStrength}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sky-900 text-md font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 bg-slate-500/10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-950"
                autoComplete="new-password"
                placeholder="Confirm your password"
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
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          <div className="flex justify-center">
            <Link to="/login" className="text-sm text-gray-600 hover:underline">
              Already registered? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
