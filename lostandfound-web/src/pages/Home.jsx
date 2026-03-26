import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // --- SCROLL ANIMATION CONFIG ---
  const { scrollY } = useScroll();
  // useSpring makes the movement "lag" slightly for a heavy, smooth feel
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  
  // Parallax: Moves the big background text horizontally as you scroll
  const xTranslation = useTransform(smoothY, [0, 1000], [0, 400]);
  // Fade/Scale effect for the Hero as it disappears
  const heroOpacity = useTransform(smoothY, [0, 400], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 400], [1, 0.9]);

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
      alert("You need to Login or Sign Up to report an item!");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden selection:bg-[#A180FF]">
        <Navbar /> 
      <motion.header 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="h-screen flex flex-col items-center justify-center text-center px-4 sticky top-0 z-10"
      >
        <div className="w-full max-w-[98vw] flex flex-col items-center">
          

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[5vw] font-[1000] leading-none tracking-[-0.05em] uppercase whitespace-nowrap"
          >
            Welcome to <span className="text-[#A180FF]">Lost & Found</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-[0.9vw] text-slate-400 font-bold uppercase tracking-[0.3em] whitespace-nowrap opacity-80"
          >
            Your trusted platform for reuniting lost items with their owners. Help others <br/>and get help when you need it most.
          </motion.p>
        </div>
      </motion.header>
      <section className="px-8 py-20 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { val: "2,400+", label: "Items Found", color: "text-vibrant-purple" },
            { val: "892", label: "Returned", color: "text-warm-yellow" },
            { val: "15K+", label: "Users", color: "text-emerald-400" },
            { val: "24/7", label: "Support", color: "text-sky-400" }
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="group"
            >
              <div className={`text-5xl font-black mb-2 transition-transform group-hover:scale-110 ${stat.color}`}>{stat.val}</div>
              <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="px-8 py-32 bg-card-dark/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-black text-center mb-20 tracking-tighter">
            WHY <span className="text-vibrant-purple">LOSTFOUND</span>?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon="📱" title="Quick Reports" desc="Instant listing with location tags and photos." />
            <FeatureCard icon="🔍" title="Smart Search" desc="Advanced matching using visual search tech." />
            <FeatureCard icon="🛡️" title="Verified" desc="Trust-first handover between community members." />
          </div>
        </div>
      </section>

      
    </div>
  );
};

// Sub-component for clean code
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="text-center p-12 rounded-[2.5rem] border border-border-grey/50 hover:border-vibrant-purple/50 bg-[#111] transition-all"
  >
    <div className="text-4xl mb-6">{icon}</div>
    <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;