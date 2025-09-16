import React, { useState } from "react";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // This would normally call your backend API
      // await axios.post("/api/auth/forgot-password", { email });

      // For now, just simulate a success message
      setMessage("If this email is registered, a reset link will be sent.");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex py-10 items-start md:items-center justify-center bg-blue-950/15">
      <div className="bg-white/55 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-900">
          Forgot Password
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-sm">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-sky-900 text-md font-medium mb-2"
          >
            Enter your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-3 bg-slate-500/10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-950"
            placeholder="example@email.com"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-600/80 text-white mt-5 py-3 rounded-lg font-semibold text-lg hover:bg-sky-950/90 transition-colors"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;