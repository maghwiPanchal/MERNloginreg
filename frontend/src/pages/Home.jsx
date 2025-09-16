import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-bl from-blue-950 via-orange-700/ to-orange-500 flex justify-center items-center px-4 md:px-12 py-16 md:py-0">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="flex flex-col justify-center items-center text-center space-y-8 md:space-y-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Welcome to Your Employee Portal
            </h1>
            <p className="text-white text-base md:text-lg tracking-wide">
              Access your employee dashboard, training, and company updates
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={
                  user ? () => navigate("/landing") : () => navigate("/login")
                }
                className="bg-sky-950/90 text-white px-8 py-3 rounded font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
              >
                {user ? "Portal" : "Login"}
              </button>
              <button
                onClick={
                  user
                    ? () => {
                        localStorage.removeItem("token");
                        setUser(null);
                        navigate("/");
                      }
                    : () => navigate("/register")
                }
                className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-orange-500 transition-colors duration-200"
              >
                {user ? "Logout" : "Register"}
              </button>
            </div>
          </div>
          <div className="w-2/3 flex justify-center mt-10 md:mt-0">
            <img
              className="h-[calc(100vh-4rem)] hidden lg:block object-cover object-[75%_center]"
              src="/construction worker.png"
              alt="Construction worker"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
