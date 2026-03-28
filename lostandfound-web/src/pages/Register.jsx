import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from "../api/api"; 

const Register = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    try {
      await api.post("/auth/register", formData);
      setMessage({ text: "Account created! Redirecting to login...", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed. Try again.";
      setMessage({ text: errorMsg, type: "error" });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans selection:bg-[#7848d6]/30">

      <div className="absolute top-0 left-0 w-full h-125 bg-[#7848d6]/15 blur-[150px] pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-420 px-4 flex justify-center"
      >

        <div className="w-full flex bg-[#111]/30 backdrop-blur-3xl rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 text-white overflow-hidden min-h-200">
          <div className="w-[55%] p-20 flex flex-col justify-center">
            <div className="text-left mb-14">
              <h2 className="text-7xl font-sm tracking-tighter mb-3 italic">
                Sign <span className="text-[#A180FF]">Up</span>
              </h2>
            </div>
            <form onSubmit={handleSignup} className="space-y-6">
              {message.text && (
                <div className={`p-4 rounded-xl text-center text-sm font-bold tracking-widest uppercase ${message.type === 'error' ? 'bg-red-500/20 border border-red-500/20 text-red-400' : 'bg-emerald-500/20 border border-emerald-500/20 text-emerald-400'}`}>
                  {message.text}
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-2xl tracking-widest opacity-70">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-500"
                  placeholder="Enter your name"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-2xl tracking-widest opacity-70">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-500"
                  placeholder="Enter your email"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-2xl tracking-widest opacity-70">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder:text-gray-500"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              <button className="w-full bg-white text-2xl text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-95 mt-4">
                Create Account
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-slate-500 text-[17px] font-black tracking-[0.2em]">
                Already a member?
                <Link to="/login" className="ml-2 text-white hover:text-[#A180FF] transition-colors underline-offset-4 underline tracking-widest">
                  Log In
                </Link>
              </p>
            </div>
          </div>
          <div className="w-[45%] bg-linear-to-bl from-[#7848d6]/80 via-[#7848d6]/30 to-[#111] p-20 flex flex-col justify-center gap-6 relative">
             <div className="absolute top-0 left-0 w-full h-full bg-[#050505]/10 backdrop-blur-sm pointer-events-none z-0" />        
             <div className="relative z-10 space-y-3">
               <h3 className="text-9xl font-[1000] uppercase tracking-tighter leading-none italic text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
                 Join <br /> Us
               </h3>
               <p className="text-slate-200 text-xl font-medium leading-relaxed max-w-sm opacity-80">
                 Become part of our mission to reconnect lost items with their rightful owners. Security and community, all in one place.
               </p>
             </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;