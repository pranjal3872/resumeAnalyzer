import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const handleOTPChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Move forward
    if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // Move backward
    if (!value && index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
    }
    };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendOTP = async () => {
    try {
      await API.post("/auth/resend-otp", {
        email,
      });

      toast.success("New OTP sent successfully!");

      setTimer(30);
      setCanResend(false);

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
        const res = await API.post("/auth/verify-otp", {
        email,
        otp: otp.join(""),
        });

      // Save JWT
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);

      toast.success("Email Verified Successfully!");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Verify Email
        </h2>

        <p className="text-gray-600 text-center mb-6">
          OTP sent to
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>

          <div className="flex justify-center gap-3 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
             <input
                id={`otp-${index}`}
                key={index}
                type="text"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => handleOTPChange(e, index)}
                className="w-12 h-12 border-2 rounded-lg text-center text-2xl font-bold focus:outline-none focus:border-blue-500"
                />
            ))}
            </div>

          <button
                type="submit"
                disabled={otp.join("").length !== 6}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                    otp.join("").length === 6
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                >
                Verify OTP
            </button>

        </form>
        

        <div className="mt-5 text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-blue-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">
              Resend OTP in <span className="font-bold">{timer}s</span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default VerifyOTP;