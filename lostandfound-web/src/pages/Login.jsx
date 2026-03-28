import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from "../api/api"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id); 

      navigate(from, { replace: true });
      window.location.reload(); 
    } catch (err) {
      setError("Invalid email or password");
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
          
          <div className="w-[40%] bg-linear-to-br from-[#7848d6]/80 via-[#7848d6]/30 to-[#111] p-20 flex flex-col justify-center gap-6 relative">
             <div className="absolute top-0 left-0 w-full h-full bg-[#050505]/10 backdrop-blur-sm pointer-events-none z-0" />
             
             <div className="relative z-10 space-y-3">
               <h3 className="text-8xl font-[1000] uppercase tracking-tighter leading-none italic text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
                 Welcome <br /> Back
               </h3>
               <p className="text-slate-200 text-l font-medium leading-relaxed max-w-sm opacity-80">
                 Your secure platform for reporting lost items, returning found belongings, and claiming your possessions. Join our community to help reunite people with their lost items.
               </p>
             </div>
          </div>

          <div className="w-[55%] p-20 flex flex-col justify-center">
            
            <div className="text-left mb-14">
              <h2 className="text-7xl font-sm tracking-tighter mb-3 italic">
                Log <span className="text-[#A180FF]">In</span>
              </h2>

            </div>

            <form onSubmit={handleLogin} className="space-y-6">

          {error && <p className="bg-red-500/70 text-white p-2 rounded text-center text-xl">{error}</p>}
          <div>
            <label className="block text-2xl tracking-widest mb-2 opacity-70">Email</label>
            <input
              type="email"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-2xl tracking-widest mb-2 opacity-70">Password</label>
            <input
              type="password"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              placeholder="••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-white text-2xl text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-95">
            Login
          </button>

        </form>
            <div className="mt-16 text-center">
              <p className="text-slate-500 text-[17px] font-black tracking-[0.2em]">
                Are you new member
                <Link to="/register" className="ml-2 text-white hover:text-[#936cff] transition-colors underline-offset-4 underline tracking-widest">
                  Sing UP
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;