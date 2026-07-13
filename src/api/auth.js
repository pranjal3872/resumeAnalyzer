import axios from "axios";
import API from "./api";

const API_URL = "http://localhost:5000/api/auth"; // backend URL

// Signup
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await API.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};
export const resetPassword = async (email, password) => {
  const response = await API.post("/auth/reset-password", {
    email,
    password,
  });

  return response.data;

  
};

export const resendOTP = async (email) => {
  const res = await API.post("/auth/resend-otp", {
    email,
  });

  return res.data;
};
export const getProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};