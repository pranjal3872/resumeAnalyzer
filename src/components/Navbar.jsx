import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    window.location.href = "/";
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
                to="/history"
                className="text-slate-300 hover:text-white font-medium transition"
              >
                History
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Logout
              </button>
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