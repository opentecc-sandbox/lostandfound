import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api/api"; 

const Register = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      
      const res = await api.post("/auth/register", formData);
      
      setMessage({ text: "Account created! Redirecting to login...", type: "success" });
      
     
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed. Try again.";
      setMessage({ text: errorMsg, type: "error" });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1499002238440-d264edd596ec')] bg-cover bg-center">
    
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 text-white">
        <h2 className="text-4xl font-semibold text-center mb-2">Join us!</h2>
        <p className="text-center text-sm text-gray-200 mb-8">Start your personal journey today</p>

        <form onSubmit={handleSignup} className="space-y-5">
          {message.text && (
            <div className={`p-3 rounded-xl text-center text-sm font-medium ${message.type === 'error' ? 'bg-red-500/50' : 'bg-emerald-500/50'}`}>
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-400"
              placeholder="e.g. John Doe"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-400"
              placeholder="your@email.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-400"
              placeholder="Min. 6 characters"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button className="w-full bg-white text-purple-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-95 mt-4">
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="opacity-70 text-gray-300">Already have an account? 
            <Link to="/login" className="ml-2 font-bold text-white hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;