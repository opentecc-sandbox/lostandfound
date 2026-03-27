import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import axios from 'axios'; // Bach n-jbdou l'data sahla

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // --- FETCH DATA MEN BACKEND ---
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Beddel had l'URL b'l'API dyalk nichan
        const res = await axios.get('http://localhost:5000/api/items'); 
        setItems(res.data.slice(0, 3)); // N-akhdo ghi akher 3 t-reportaw
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // --- SCROLL ANIMATION CONFIG ---
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothY, [0, 400], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 400], [1, 0.9]);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden selection:bg-[#A180FF]">
      <Navbar /> 
      
      <motion.header 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="h-screen flex flex-col items-center justify-center mb-0 text-center px-4 sticky top-0 z-10"
      >
        <div className="w-full max-w-[95vw] flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8}}
            className="text-[6vw] font-[1000] leading-none tracking-[-0.05em] uppercase whitespace-nowrap"
          >
            Welcome to <span className="text-[#7848d6]">Lost & Found</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-[0.9vw] text-slate-400 font-bold uppercase tracking-[0.3em] whitespace-nowrap opacity-80"
          >
            Your trusted platform for reuniting lost items with their owners.Help others <br/>and get help when you need it most.
          </motion.p>
        </div>
      </motion.header>

      {/* --- STATS SECTION --- */}
      <section className="px-8 py-2 relative z-10 mb-80 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { val: "2,400+", label: "Items Found", color: "text-[#A180FF]" },
            { val: "892", label: "Returned", color: "text-[#FFD280]" },
            { val: "15K+", label: "Users", color: "text-emerald-400" },
            { val: "24/7", label: "Support", color: "text-sky-400" }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <div className={`text-7xl font-black mb-2 transition-transform group-hover:scale-110 ${stat.color}`}>{stat.val}</div>
              <div className="text-slate-500 text-[20px] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-16 py-32 bg-[#080808] relative  mb-50 z-10 border-t border-white/5">
        <div className="max-w-m mx-auto">
          <div className="flex flex-col items-center justify-center mb-15 text-center">
            <div>
              <h3 className=" text-[#ddd6ff] text-6xl font-black text-center  tracking-tighter uppercase">
                Recently Reported
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {items.length > 0 ? (
              items.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -15 }}
                  className="bg-[#111] rounded-[20px] border border-white/5 overflow-hidden group transition-all hover:border-[#A180FF]/30"
                >
                  <div className="h-90 bg-slate-900 relative overflow-hidden">
                    
                    
                  
                    <img 
                      src={item.image ? `http://localhost:5000/${item.image}` : 'https://media.istockphoto.com/id/1471425948/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=170667a&w=0&k=20&c=Tq41AqeDgGeaYRfRrD4yc6AqGPrVfdscVU3--1ZNiHg='} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent"></div>
                  </div>

                  <div className="p-12">
                    <h4 className="text-3xl font-normal uppercase tracking-tighter mb-4">{item.type} {item.title}</h4>
                    {/**/}
                    <div className="flex items-center gap-4 text-slate-500 mb-8 uppercase text-sm font-bold tracking-widest">
                      <span>📍 {item.location}</span>
                      <span>•</span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-32 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                 <p className="text-slate-500 text-2xl uppercase font-black tracking-widest">
                   {loading ? "Loading items..." : "No items reported yet."}
                 </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="px-16 py-32 bg-[#0A0A0A] relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-6xl font-black text-center mb-15 tracking-tighter uppercase">Why LostFound?</h3>
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

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div whileHover={{ y: -10 }} className="text-center p-16 rounded-[40px] border border-white/5 hover:border-[#A180FF]/50 bg-[#111] transition-all group">
    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500 block">{icon}</div>
    <h4 className="text-4xl font-[1000] mb-4 uppercase tracking-tighter italic">{title}</h4>
    <p className="text-slate-500 text-xl leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;