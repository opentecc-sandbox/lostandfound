import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { SearchCode } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transform  transition-all pt-20 duration-500 ${
      scrolled 
        ? 'py-4  from-[#7848d6]/85 backdrop-blur-xl border-b border-white/5' 
        : 'py-10 from-[#7848d6]/85 backdrop-blur-md' 
    }`}>
      <div className="w-[95%] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
            <svg 
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
             className="w-10 h-10 fill-[#ffffff] drop-shadow-[0_0_12px_rgba(161,128,255,0.5)] transition-transform group-hover:scale-110">
             <path d="m11.586 21.134c-1.514-1.707-4.086-5.184-4.086-9.134 0-1.039.18-2.047.472-3h13.567c.202.641.357 1.309.41 2 .027.345.052.923.034 1.386.641 1.057 1.017 2.291 1.017 3.614 0 .317-.029.628-.07.934.681-1.506 1.07-3.173 1.07-4.934 0-6.617-5.383-12-12-12s-12 5.383-12 12 5.383 12 12 12c1.761 0 3.428-.389 4.934-1.07-.306.041-.617.07-.934.07-1.861 0-3.24-.689-4.414-1.866zm.415-18.719c.814.864 2.207 2.506 3.229 4.586h-6.452c1.025-2.082 2.411-3.724 3.223-4.586zm8.646 4.586h-3.223c-.789-1.879-1.879-3.476-2.819-4.644 2.572.696 4.733 2.389 6.041 4.644zm-11.259-4.643c-.94 1.167-2.024 2.767-2.81 4.642h-3.225c1.308-2.253 3.466-3.945 6.035-4.642zm-6.927 6.642h3.442c-.246.956-.403 1.958-.403 3s.157 2.044.403 3h-3.442c-.299-.948-.461-1.955-.461-3s.163-2.052.461-3zm.892 8h3.225c.787 1.875 1.87 3.475 2.81 4.642-2.569-.697-4.728-2.39-6.035-4.642zm17.647-1c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5c1.017 0 1.962-.309 2.753-.833l3.792 3.792 1.414-1.414-3.792-3.792c.524-.791.833-1.736.833-2.753z"/>
            </svg>
            <h1 className="text-3xl font-[1000] tracking-tighter uppercase italic">
                Lost<span className=" from-[#7848d6]/85">Found</span>
            </h1>
        </div>
        
        <div className="hidden md:flex gap-20 text-xl font-black uppercase tracking-[0.4em]">
          <Link 
            to="/" 
            className={`transition-all ${location.pathname === "/" ? "text-white" : " text-slate-400  hover:text-white"}`}>
            Home
          </Link>
          <Link 
            to="/lost" 
            className={`transition-all ${location.pathname === "/lost" ? "text-white" : " text-slate-400  hover:text-white"}`}>
            Report Lost
          </Link>
          <Link 
            to="/found" 
            className={`transition-all ${location.pathname === "/found" ? "text-white" : " text-slate-400  hover:text-white"}`}
>
            Report Found
          </Link>
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
            <button onClick={handleLogout} className="group flex items-center gap-2 border px-5 py-2 rounded-full bg-[#ffffff] hover:bg-[#000000] transition-all">
               <span className="text-[20px] font-black tracking-widest text-[#000000] group-hover:text-white">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;