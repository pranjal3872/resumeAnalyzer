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
      <div className="bg-[#FFF8EE] min-h-screen p-8">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-10 w-72 bg-orange-200 rounded-full mb-8" />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="h-56 bg-white rounded-[2rem] border-4 border-orange-100" />
            <div className="h-56 bg-white rounded-[2rem] border-4 border-orange-100" />
            <div className="h-56 bg-white rounded-[2rem] border-4 border-orange-100" />
          </div>
        </div>
      </div>
    );
  }

  // ---- Error / empty state ----
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFF8EE] text-center px-6">
        <div className="w-20 h-20 rounded-full bg-[#FFD93D] border-4 border-[#2D2A26] flex items-center justify-center mb-5 rotate-[-6deg]">
          <FaClipboardList className="text-3xl text-[#2D2A26]" />
        </div>
        <p className="text-lg font-bold text-[#2D2A26] mb-4">{error}</p>
        <button
          onClick={fetchResume}
          className="inline-flex items-center gap-2 bg-[#FF6B6B] text-white px-6 py-3 rounded-full font-bold border-4 border-[#2D2A26] hover:-translate-y-1 transition shadow-[4px_4px_0px_#2D2A26]"
        >
          <FaRedo className="text-sm" />
          Try again
        </button>
      </div>
    );
  }

  // ---- Score math ----
  const score = resume.atsScore;

  let accent = "#FF6B6B"; // coral
  let scoreLabel = "Needs a boost";
  let grade = "D";
  let emoji = "💪";
  if (score >= 90) {
    accent = "#6BCB77"; scoreLabel = "Excellent!"; grade = "A"; emoji = "🎉";
  } else if (score >= 80) {
    accent = "#4D96FF"; scoreLabel = "Looking good"; grade = "B"; emoji = "✨";
  } else if (score >= 65) {
    accent = "#FFD93D"; scoreLabel = "Getting there"; grade = "C"; emoji = "👍";
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Sections with their own bright accent color + thick border card
  const sections = [
    {
      key: "strengths",
      title: "Strengths",
      color: "#6BCB77",
      bg: "#EFFCEF",
      Icon: FaCheckCircle,
      rotate: "-rotate-1",
      content: (
        <ul className="space-y-2.5">
          {resume.strengths.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#3f3d38] text-sm font-medium">
              <FaCheckCircle className="text-[#6BCB77] mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "missing",
      title: "Missing Skills",
      color: "#FF6B6B",
      bg: "#FFF1F1",
      Icon: FaTimesCircle,
      rotate: "rotate-1",
      content: (
        <ul className="space-y-2.5">
          {resume.missingSkills.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#3f3d38] text-sm font-medium">
              <FaTimesCircle className="text-[#FF6B6B] mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "grammar",
      title: "Grammar Suggestions",
      color: "#4D96FF",
      bg: "#EFF6FF",
      Icon: FaPen,
      rotate: "-rotate-1",
      content: (
        <ul className="space-y-2.5">
          {resume.grammarSuggestions.map((item, i) => (
            <li key={i} className="text-[#3f3d38] text-sm font-medium border-l-4 border-[#4D96FF] pl-3">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "roles",
      title: "Recommended Roles",
      color: "#9B5DE5",
      bg: "#F6EFFF",
      Icon: FaBriefcase,
      rotate: "rotate-1",
      content: (
        <div className="flex flex-wrap gap-2">
          {resume.recommendedRoles.map((item, i) => (
            <span
              key={i}
              className="text-sm font-bold text-[#9B5DE5] bg-white px-3 py-1.5 rounded-full border-2 border-[#9B5DE5]"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#FFF8EE] min-h-screen p-8 relative overflow-hidden">

      {/* confetti dots */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-4 h-4 rounded-full bg-[#FFD93D]" />
      <div className="pointer-events-none absolute top-24 right-1/3 w-3 h-3 rounded-full bg-[#4D96FF]" />
      <div className="pointer-events-none absolute top-16 right-16 w-5 h-5 rounded-full bg-[#FF6B6B]" />
      <div className="pointer-events-none absolute bottom-24 left-12 w-4 h-4 rotate-45 bg-[#6BCB77]" />
      <div className="pointer-events-none absolute bottom-40 right-24 w-3 h-3 rounded-full bg-[#9B5DE5]" />

      <div className="max-w-6xl mx-auto relative">

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#2D2A26]">
              Your Resume Report {emoji}
            </h1>
            <p className="text-[#6b6862] mt-1 font-medium">
              {resume.fileName || "Your resume"} — fresh off the scanner.
            </p>
          </div>
          <button
            onClick={fetchResume}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2D2A26] bg-white border-4 border-[#2D2A26] px-4 py-2.5 rounded-full hover:-translate-y-1 transition shadow-[3px_3px_0px_#2D2A26]"
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
              className="absolute -top-4 -right-3 text-xs font-extrabold text-white px-3 py-1.5 rounded-full border-2 border-[#2D2A26] rotate-6"
              style={{ backgroundColor: accent }}
            >
              Grade {grade}
            </span>

            <h2 className="text-sm font-bold text-[#2D2A26] uppercase tracking-wide mb-4 self-start">
              ATS Score
            </h2>

            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#f1efe9" strokeWidth="14" />
                <circle
                  cx="70" cy="70" r={radius} fill="none"
                  stroke={accent} strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#2D2A26]">{score}</span>
                <span className="text-[10px] text-[#9c988f] font-bold">/ 100</span>
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
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-[#2D2A26]"
                  style={{ backgroundColor: s.color }}
                >
                  <s.Icon className="text-white text-sm" />
                </div>
                <h2 className="text-lg font-extrabold text-[#2D2A26]">{s.title}</h2>
              </div>
              {s.content}
            </div>
          ))}
        </div>

        {/* Summary banner */}
        <div
          className="rounded-[2rem] border-4 border-[#2D2A26] p-7 mb-6 relative"
          style={{ background: "linear-gradient(135deg, #FFD93D, #FF9F43)" }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-[#2D2A26] flex items-center justify-center shrink-0">
              <FaClipboardList className="text-[#2D2A26] text-sm" />
            </div>
            <h2 className="text-xl font-extrabold text-[#2D2A26]">Summary</h2>
          </div>
          <p className="text-[#2D2A26] leading-7 font-medium">{resume.summary}</p>
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
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-[#2D2A26]"
                  style={{ backgroundColor: s.color }}
                >
                  <s.Icon className="text-white text-sm" />
                </div>
                <h2 className="text-lg font-extrabold text-[#2D2A26]">{s.title}</h2>
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