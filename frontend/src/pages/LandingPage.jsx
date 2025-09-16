import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Squares2X2Icon,
  UserIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const LandingPage = ({ user }) => {
  const [userDetails, setUserDetails] = useState(user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserDetails(response.data);
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-8 bg-blue-950/15">
      <div className="flex flex-col bg-white/55 p-8 rounded-lg shadow-lg w-full md:max-w-xs space-y-4">
        <div className="flex items-center space-x-3 hover:bg-orange-500/50 cursor-pointer rounded-md p-2 transition">
          <Squares2X2Icon className="h-6 w-6 text-blue-900" />
          <span>Employee Dashboard</span>
        </div>
        <div className="flex items-center space-x-3 hover:bg-orange-500/50 cursor-pointer rounded-md p-2 transition">
          <UserIcon className="h-6 w-6 text-blue-900" />
          <span>Profile</span>
        </div>
        <div className="flex items-center space-x-3 hover:bg-orange-500/50 cursor-pointer rounded-md p-2 transition">
          <AcademicCapIcon className="h-6 w-6 text-blue-900" />
          <span>Training</span>
        </div>
      </div>
      <div className="flex flex-col px-5 py-5 flex-1 w-full">
        <div className="flex-1 flex flex-col h-full">
          <h2 className="text-center">
            Hi <span className="font-bold">{userDetails?.username || userDetails?.email}</span>, welcome to your employee portal.
          </h2>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 h-full">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col items-start justify-center">
              <h3 className="text-lg font-bold mb-2 text-blue-900">
                Profile Summary
              </h3>
              <p className="text-sm text-gray-600">
                View and edit your basic employee information and account
                details here.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col items-start justify-center">
              <h3 className="text-lg font-bold mb-2 text-blue-900">
                Training Modules
              </h3>
              <p className="text-sm text-gray-600">
                Access your assigned training modules and track your learning
                progress.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col items-start justify-center">
              <h3 className="text-lg font-bold mb-2 text-blue-900">Tasks</h3>
              <p className="text-sm text-gray-600">
                Stay on top of your current tasks and upcoming deadlines in this
                section.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col items-start justify-center">
              <h3 className="text-lg font-bold mb-2 text-blue-900">Messages</h3>
              <p className="text-sm text-gray-600">
                Check your latest messages and notifications from your team and
                HR.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
