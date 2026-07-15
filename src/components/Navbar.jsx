import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

const userName = localStorage.getItem("name");
const userEmail = localStorage.getItem("email");
const userPhoto = localStorage.getItem("profilePhoto");
  

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    const logout = () => {
  localStorage.clear();
  navigate("/");
};
  };

  return (
    <nav className="bg-slate-900 shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-white tracking-tight flex items-center gap-2"
        >
          <span className="text-indigo-400">📄</span>
          Resume Analyzer
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="text-slate-300 hover:text-white font-medium transition"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/upload"
                className="text-slate-300 hover:text-white font-medium transition"
              >
                Upload
              </Link>
              <Link
              to="/dashboard"
              className="text-slate-300 hover:text-white font-medium transition"
            >
              Dashboard
            </Link>

              <Link
                to="/history"
                className="text-slate-300 hover:text-white font-medium transition"
              >
                History
              </Link>
                 <div className="relative">

                <button
                  onClick={() => setOpen(!open)}
                  className="focus:outline-none"
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {userName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden z-50">

                    <div className="px-5 py-4 border-b">
                      <h3 className="font-bold text-gray-800">
                        {userName}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {userEmail}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      👤 My Profile
                    </button>

                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      📊 Dashboard
                    </button>

                    <button
                      onClick={() => navigate("/history")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      📜 History
                    </button>

                    <button
                      onClick={() => navigate("/forgot-password")}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      🔒 Change Password
                    </button>

                    <hr />

                    <button
                      onClick={logout}
                      className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>

                  </div>
                )}

              </div>

              
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white font-medium transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;