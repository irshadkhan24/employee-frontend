import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'; // if you're using lucide (optional)
import "../style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://employee-api-41gx.vercel.app/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-[#1985DB] from-50% to-gray-100 to-50% space-y-6 shadow-md">
      {/*<div className="loginPage"></div>
      <div className="loginForm"></div> */}
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2x1 font-bold mb-4">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              /*autoComplete="off"*/
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border pr-10"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                /* autoComplete="new-password" */
                required
              />
              <span
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={26} /> : <Eye size={26} />}
              </span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox accent-[#0078D7]" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-[#0078D7]">Forget password?</a>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#0078D7] hover:bg-[#1985DB] text-white py-2 shadow-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
