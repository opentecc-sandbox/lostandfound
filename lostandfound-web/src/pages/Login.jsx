import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api/api"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1499002238440-d264edd596ec')] bg-cover bg-center">
      {/* الـ Glass Card */}
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 text-white">
        <h2 className="text-4xl font-semibold text-center mb-2">Welcome back!</h2>
        <p className="text-center text-sm text-gray-200 mb-8">Sign in to access your journey</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="bg-red-500/50 text-white p-2 rounded text-center text-sm">{error}</p>}
          
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Email</label>
            <input 
              type="email" 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-white text-purple-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-95">
            Log In
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="opacity-70">Don't have an account? 
            <Link to="/signup" className="ml-2 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;