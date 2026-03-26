import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProtectedAction = (path) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-6 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'py-10 bg-black'
    }`}>
      <div className="w-[95%] mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic cursor-pointer" onClick={() => navigate("/")}>
          Lost<span className="text-[#A180FF]">Found</span>
        </h1>
        
        <div className="hidden md:flex gap-20 text-xl font-black uppercase tracking-[0.4em]">
          <Link to="/" className="text-white hover:text-[#A180FF] transition-all">Home</Link>
          <button onClick={() => handleProtectedAction("/lost")} className="text-slate-400 hover:text-[#A180FF]">Report Lost</button>
          <button onClick={() => navigate("/found")} className="text-slate-400 hover:text-[#A180FF]">Report Found</button>
        </div>

        <div className="flex items-center gap-12">
          {!token ? (
            <div className="flex items-center gap-12">
              <Link to="/login" className="bg-[#ffffff] text-black px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.2em] hover:scale-110 transition-all shadow-lg shadow-[#A180FF]/40">Log in</Link>
              <Link to="/register" className="text-white text-sm font-black uppercase tracking-[0.2em] hover:text-[#A180FF]">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-10">
              <span className="text-sm font-black uppercase text-slate-500 italic"></span>
              <button onClick={handleLogout} className="text-[#ffffff] text-2xl font-black hover:underline">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;