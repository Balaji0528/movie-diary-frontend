import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      toast.success("Registration successful, Redirecting to login")
      navigate("/login");
    } catch (error) {
      toast.error("Registration unsuccessfull")
    }
  }

  return (
    <div className="min-h-screen bg-[#14181c] flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-[#1c2228] p-8 rounded-xl shadow-lg border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Join MovieDiary
        </p>

        <label className="text-gray-300 text-sm">Name</label>
        <input
          type="text"
          name="userName"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-2 mb-5 px-4 py-3 rounded-md bg-[#2c3440] text-white border border-gray-600 outline-none focus:border-[#00c030]"
          placeholder="Enter your Name"
        />

        <label className="text-gray-300 text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-2 mb-5 px-4 py-3 rounded-md bg-[#2c3440] text-white border border-gray-600 outline-none focus:border-[#00c030]"
          placeholder="Enter your Email"
        />

        <label className="text-gray-300 text-sm">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-2 mb-6 px-4 py-3 rounded-md bg-[#2c3440] text-white border border-gray-600 outline-none focus:border-[#00c030]"
          placeholder="Enter your Password"
        />

        <button className="w-full bg-[#00c030] text-white font-semibold py-3 rounded-md hover:bg-[#00a82a] transition">
          Register
        </button>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#40bcf4] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;