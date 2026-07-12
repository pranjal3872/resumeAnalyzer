import { Link } from "react-router-dom";
import { FaRobot, FaChartLine, FaFileAlt, FaCheckCircle, FaArrowRight, FaSpellCheck, FaBullseye } from "react-icons/fa";

function Home() {
  const name = localStorage.getItem("name");

  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div className="bg-slate-50 min-h-screen overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-50 via-slate-50 to-slate-50">

        {/* decorative background blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-32 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">

          <div className="lg:w-1/2">

            {name ? (
              <p className="text-lg font-semibold text-indigo-600 mb-4">
                {greeting}, {name} 👋
              </p>
            ) : (
              <span className="inline-flex items-center gap-2 bg-white text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4 shadow-sm border border-indigo-100">
                <FaCheckCircle className="text-indigo-600" />
                Trusted by job seekers everywhere
              </span>
            )}

            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Resume Analyzer
              </span>
            </h1>

            <p className="text-slate-600 mt-6 text-lg leading-relaxed max-w-lg">
              Upload your resume and receive an AI-generated ATS score,
              personalized feedback, missing skills, grammar improvements,
              and recommended job roles in just a few seconds.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/upload"
                className="group flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition font-semibold shadow-lg shadow-indigo-300/50"
              >
                Analyze Resume
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/history"
                className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl hover:border-slate-300 hover:shadow-md transition font-semibold"
              >
                View History
              </Link>

            </div>

            <div className="flex items-center gap-8 mt-12">
              <div>
                <p className="text-3xl font-extrabold text-slate-900">50K+</p>
                <p className="text-sm text-slate-500 mt-0.5">Resumes analyzed</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <p className="text-3xl font-extrabold text-slate-900">92%</p>
                <p className="text-sm text-slate-500 mt-0.5">Avg. ATS score boost</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <p className="text-3xl font-extrabold text-slate-900">4.8/5</p>
                <p className="text-sm text-slate-500 mt-0.5">User rating</p>
              </div>
            </div>

          </div>

          {/* Right Side Card */}
          <div className="lg:w-1/2 flex justify-center">

            <div className="relative">

              {/* floating badge: grammar */}
              <div className="hidden md:flex absolute -top-7 -left-8 z-20 items-center gap-2 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 rotate-[-4deg] animate-[float_6s_ease-in-out_infinite]">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                  <FaSpellCheck className="text-purple-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 leading-none">Grammar</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">Clean</p>
                </div>
              </div>

              {/* floating badge: keyword match */}
              <div className="hidden md:flex absolute -bottom-7 -right-8 z-20 items-center gap-2 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 rotate-[3deg] animate-[float_7s_ease-in-out_infinite_0.5s]">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <FaBullseye className="text-green-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 leading-none">Keyword match</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">Strong</p>
                </div>
              </div>

              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-96 border border-slate-100">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    Resume Score
                  </h2>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    Excellent
                  </span>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-36 h-36">
                    <svg className="w-36 h-36 -rotate-90" viewBox="0 0 140 140">
                      <circle cx="70" cy="70" r="60" fill="none" stroke="#e0e7ff" strokeWidth="12" />
                      <circle
                        cx="70" cy="70" r="60" fill="none"
                        stroke="url(#scoreGradient)" strokeWidth="12" strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={0}
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        100%
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-center mt-6 text-slate-500 text-sm">
                  AI generated ATS Score
                </p>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FaCheckCircle className="text-green-500 shrink-0" />
                    Strong keyword match for target role
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FaCheckCircle className="text-green-500 shrink-0" />
                    Clean formatting, ATS-friendly
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
            Why choose us
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            Everything your resume needs
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Built to get you past applicant tracking systems and in
            front of a real recruiter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 p-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6 shadow-md shadow-indigo-200 group-hover:scale-110 transition-transform">
              <FaRobot className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">
              AI Analysis
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Analyze resumes using AI and receive smart, actionable
              suggestions in seconds.
            </p>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 shadow-md shadow-green-200 group-hover:scale-110 transition-transform">
              <FaChartLine className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">
              ATS Score
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Get an ATS compatibility score with clear tips to
              improve it.
            </p>
          </div>

          <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 p-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-md shadow-purple-200 group-hover:scale-110 transition-transform">
              <FaFileAlt className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900">
              Resume History
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Access all your previous resume analyses anytime,
              anywhere.
            </p>
          </div>

        </div>

      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

    </div>
  );
}

export default Home;