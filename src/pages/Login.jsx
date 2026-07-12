import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser({ email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.user.name);

    navigate("/");
    toast.success("Login successful!");

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Login failed"
    );
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
