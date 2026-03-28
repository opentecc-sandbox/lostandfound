import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-75 bg-[#7848d6]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
               <svg 
                 viewBox="0 0 24 24"
                 className="w-8 h-8 fill-white drop-shadow-[0_0_8px_rgba(161,128,255,0.6)]">
                 <path d="m11.586 21.134c-1.514-1.707-4.086-5.184-4.086-9.134 0-1.039.18-2.047.472-3h13.567c.202.641.357 1.309.41 2 .027.345.052.923.034 1.386.641 1.057 1.017 2.291 1.017 3.614 0 .317-.029.628-.07.934.681-1.506 1.07-3.173 1.07-4.934 0-6.617-5.383-12-12-12s-12 5.383-12 12 5.383 12 12 12c1.761 0 3.428-.389 4.934-1.07-.306.041-.617.07-.934.07-1.861 0-3.24-.689-4.414-1.866zm.415-18.719c.814.864 2.207 2.506 3.229 4.586h-6.452c1.025-2.082 2.411-3.724 3.223-4.586zm8.646 4.586h-3.223c-.789-1.879-1.879-3.476-2.819-4.644 2.572.696 4.733 2.389 6.041 4.644zm-11.259-4.643c-.94 1.167-2.024 2.767-2.81 4.642h-3.225c1.308-2.253 3.466-3.945 6.035-4.642zm-6.927 6.642h3.442c-.246.956-.403 1.958-.403 3s.157 2.044.403 3h-3.442c-.299-.948-.461-1.955-.461-3s.163-2.052.461-3zm.892 8h3.225c.787 1.875 1.87 3.475 2.81 4.642-2.569-.697-4.728-2.39-6.035-4.642zm17.647-1c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5c1.017 0 1.962-.309 2.753-.833l3.792 3.792 1.414-1.414-3.792-3.792c.524-.791.833-1.736.833-2.753z"/>
               </svg>
               <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                 Lost<span className="text-[#A180FF]">Found</span>
               </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Reuniting lost items with their rightful owners through community power and modern technology.
            </p>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Navigation</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
              <li><Link to="/" className="hover:text-[#A180FF] transition-colors">Home</Link></li>
              <li><Link to="/lost" className="hover:text-[#A180FF] transition-colors">Report Lost</Link></li>
              <li><Link to="/found" className="hover:text-[#A180FF] transition-colors">Report Found</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-[#A180FF] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#A180FF] transition-colors">Safety Rules</a></li>
              <li><a href="#" className="hover:text-[#A180FF] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Join Us</h4>
            <button className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-4 rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(161,128,255,0.3)]">
              Get Started
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[13px] font-black uppercase tracking-[0.3em]">
            © 2026 LOSTFOUND COMMUNITY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-slate-500 text-xs font-black uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
