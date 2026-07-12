import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      toast.success(data.message);

      // Redirect to OTP Verification page
      navigate("/verify-otp", {
        state: {
          email,
        },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Signup;