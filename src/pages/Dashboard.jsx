import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaPen,
  FaBriefcase,
  FaRedo,
  FaClipboardList,
} from "react-icons/fa";

function Dashboard() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResume = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/resumes/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const latest = response.data.resumes[0];
      if (!latest) {
        setError("No resume found. Upload one to see your analysis.");
      } else {
        setResume(latest);
      }
    } catch (err) {
      console.log(err);
      setError("Couldn't load your resume analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  // ---- Loading state ----
  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen p-8">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-10 w-72 bg-blue-100 rounded-full mb-8" />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="h-56 bg-white rounded-[2rem] border-4 border-blue-100" />
            <div className="h-56 bg-white rounded-[2rem] border-4 border-blue-100" />
            <div className="h-56 bg-white rounded-[2rem] border-4 border-blue-100" />
          </div>
        </div>
      </div>
    );
  }

  // ---- Error / empty state ----
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F8FAFC] text-center px-6">
        <div className="w-20 h-20 rounded-full bg-[#4F46E5] border-4 border-[#0F172A] flex items-center justify-center mb-5 rotate-[-6deg]">
          <FaClipboardList className="text-3xl text-white" />
        </div>
        <p className="text-lg font-bold text-[#0F172A] mb-4">{error}</p>
        <button
          onClick={fetchResume}
          className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-full font-bold border-4 border-[#0F172A] hover:-translate-y-1 transition shadow-[4px_4px_0px_#0F172A]"
        >
          <FaRedo className="text-sm" />
          Try again
        </button>
      </div>
    );
  }

  // ---- Score math ----
  const score = resume.atsScore;

  let accent = "#DC2626"; // error red
  let scoreLabel = "Needs a boost";
  let grade = "D";
  let emoji = "💪";
  if (score >= 90) {
    accent = "#16A34A"; scoreLabel = "Excellent!"; grade = "A"; emoji = "🎉";
  } else if (score >= 80) {
    accent = "#2563EB"; scoreLabel = "Looking good"; grade = "B"; emoji = "✨";
  } else if (score >= 65) {
    accent = "#4F46E5"; scoreLabel = "Getting there"; grade = "C"; emoji = "👍";
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Sections with their own accent color + thick border card
  const sections = [
    {
      key: "strengths",
      title: "Strengths",
      color: "#16A34A",
      bg: "#F0FDF4",
      Icon: FaCheckCircle,
      rotate: "-rotate-1",
      content: (
        <ul className="space-y-2.5">
          {resume.strengths.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#475569] text-sm font-medium">
              <FaCheckCircle className="text-[#16A34A] mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "missing",
      title: "Missing Skills",
      color: "#DC2626",
      bg: "#FEF2F2",
      Icon: FaTimesCircle,
      rotate: "rotate-1",
      content: (
        <ul className="space-y-2.5">
          {resume.missingSkills.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#475569] text-sm font-medium">
              <FaTimesCircle className="text-[#DC2626] mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "grammar",
      title: "Grammar Suggestions",
      color: "#2563EB",
      bg: "#EFF6FF",
      Icon: FaPen,
      rotate: "-rotate-1",
      content: (
        <ul className="space-y-2.5">
          {resume.grammarSuggestions.map((item, i) => (
            <li key={i} className="text-[#475569] text-sm font-medium border-l-4 border-[#2563EB] pl-3">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "roles",
      title: "Recommended Roles",
      color: "#4F46E5",
      bg: "#EEF2FF",
      Icon: FaBriefcase,
      rotate: "rotate-1",
      content: (
        <div className="flex flex-wrap gap-2">
          {resume.recommendedRoles.map((item, i) => (
            <span
              key={i}
              className="text-sm font-bold text-[#4F46E5] bg-white px-3 py-1.5 rounded-full border-2 border-[#4F46E5]"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-8 relative overflow-hidden">

      {/* confetti dots */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-4 h-4 rounded-full bg-[#4F46E5]" />
      <div className="pointer-events-none absolute top-24 right-1/3 w-3 h-3 rounded-full bg-[#2563EB]" />
      <div className="pointer-events-none absolute top-16 right-16 w-5 h-5 rounded-full bg-[#DC2626]" />
      <div className="pointer-events-none absolute bottom-24 left-12 w-4 h-4 rotate-45 bg-[#16A34A]" />
      <div className="pointer-events-none absolute bottom-40 right-24 w-3 h-3 rounded-full bg-[#4F46E5]" />

      <div className="max-w-6xl mx-auto relative">

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#0F172A]">
              Your Resume Report {emoji}
            </h1>
            <p className="text-[#475569] mt-1 font-medium">
              {resume.fileName || "Your resume"} — fresh off the scanner.
            </p>
          </div>
          <button
            onClick={fetchResume}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F172A] bg-white border-4 border-[#0F172A] px-4 py-2.5 rounded-full hover:-translate-y-1 transition shadow-[3px_3px_0px_#0F172A]"
          >
            <FaRedo className="text-xs" />
            Refresh
          </button>
        </div>

        {/* Score + sections grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">

          {/* Score blob card */}
          <div
            className="relative bg-white rounded-[2.5rem] border-4 p-6 text-center flex flex-col items-center justify-center hover:-translate-y-1 transition"
            style={{ borderColor: accent, boxShadow: `6px 6px 0px ${accent}` }}
          >
            <span
              className="absolute -top-4 -right-3 text-xs font-extrabold text-white px-3 py-1.5 rounded-full border-2 border-[#0F172A] rotate-6"
              style={{ backgroundColor: accent }}
            >
              Grade {grade}
            </span>

            <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide mb-4 self-start">
              ATS Score
            </h2>

            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="14" />
                <circle
                  cx="70" cy="70" r={radius} fill="none"
                  stroke={accent} strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#0F172A]">{score}</span>
                <span className="text-[10px] text-[#94A3B8] font-bold">/ 100</span>
              </div>
            </div>

            <p className="mt-4 font-bold text-sm" style={{ color: accent }}>
              {scoreLabel}
            </p>
          </div>

          {/* Strengths + Missing as two smaller stacked cards on the right two columns */}
          {sections.slice(0, 2).map((s) => (
            <div
              key={s.key}
              className={`bg-white rounded-[2rem] border-4 p-6 hover:-translate-y-1 hover:rotate-0 transition ${s.rotate}`}
              style={{ borderColor: s.color, backgroundColor: s.bg, boxShadow: `6px 6px 0px ${s.color}` }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-[#0F172A]"
                  style={{ backgroundColor: s.color }}
                >
                  <s.Icon className="text-white text-sm" />
                </div>
                <h2 className="text-lg font-extrabold text-[#0F172A]">{s.title}</h2>
              </div>
              {s.content}
            </div>
          ))}
        </div>

        {/* Summary banner */}
        <div
          className="rounded-[2rem] border-4 border-[#0F172A] p-7 mb-6 relative"
          style={{ background: "linear-gradient(135deg, #2563EB, #4F46E5)" }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-[#0F172A] flex items-center justify-center shrink-0">
              <FaClipboardList className="text-[#0F172A] text-sm" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Summary</h2>
          </div>
          <p className="text-white leading-7 font-medium">{resume.summary}</p>
        </div>

        {/* Grammar + Roles */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.slice(2).map((s) => (
            <div
              key={s.key}
              className={`bg-white rounded-[2rem] border-4 p-6 hover:-translate-y-1 hover:rotate-0 transition ${s.rotate}`}
              style={{ borderColor: s.color, backgroundColor: s.bg, boxShadow: `6px 6px 0px ${s.color}` }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-[#0F172A]"
                  style={{ backgroundColor: s.color }}
                >
                  <s.Icon className="text-white text-sm" />
                </div>
                <h2 className="text-lg font-extrabold text-[#0F172A]">{s.title}</h2>
              </div>
              {s.content}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;