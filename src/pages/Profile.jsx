import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaFileAlt,
  FaCheckCircle,
  FaEdit,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const { user, totalResumes } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-10 px-4">

      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-8">

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold shadow-lg">

            {user.name.charAt(0).toUpperCase()}

          </div>

          <h2 className="text-3xl font-bold mt-5">

            {user.name}

          </h2>

          <p className="text-gray-500">

            {user.email}

          </p>

          <div className="flex items-center gap-2 mt-3 text-green-600 font-semibold">

            <FaCheckCircle />

            Verified Account

          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 border rounded-2xl p-5 space-y-5">

          <div className="flex justify-between">

            <div className="flex items-center gap-3">

              <FaFileAlt className="text-blue-600" />

              Total Resumes

            </div>

            <span className="font-bold">

              {totalResumes}

            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex items-center gap-3">

              <FaCalendarAlt className="text-blue-600" />

              Joined On

            </div>

            <span>

              {new Date(user.createdAt).toLocaleDateString()}

            </span>

          </div>

        </div>

        {/* User Info */}

        <div className="mt-8 border rounded-2xl p-5 space-y-5">

          <div>

            <label className="text-gray-500 text-sm">

              Name

            </label>

            <div className="flex items-center gap-3 mt-2">

              <FaUserCircle className="text-blue-600" />

              <span className="font-semibold">

                {user.name}

              </span>

            </div>

          </div>

          <div>

            <label className="text-gray-500 text-sm">

              Email

            </label>

            <div className="flex items-center gap-3 mt-2">

              <FaEnvelope className="text-blue-600" />

              <span className="font-semibold">

                {user.email}

              </span>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 space-y-4">

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-3"
          >
            <FaEdit />

            Edit Profile
          </button>

          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl flex justify-center items-center gap-3"
          >
            <FaKey />

            Change Password
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-3"
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;