import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const ReportLost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    type: 'LOST', 
    date: '',
    contact: '',
    photoUrl: '' ,
    userId: localStorage.getItem('userId') || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUserId = localStorage.getItem('userId');

    if (!currentUserId) {
      alert("Error: User ID not found. Please log in first!");
      navigate('/login');
      return;
    }

    const dataToSubmit = {
      ...formData,
      userId: parseInt(currentUserId) 
    };

    try {
      await axios.post('http://localhost:5000/api/items', dataToSubmit);
      alert('Lost item reported! We hope you find it soon.');
      navigate('/');
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      alert(error.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0505057c] text-white overflow-x-hidden">
      <Navbar />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-[#7848d6]/35 blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 flex justify-center items-center pt-48 pb-32 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-[#111]/10 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-12 md:p-20 shadow-2xl"
        >
 
          <div className="mb-16 text-center">
            <h2 className="text-6xl font-[1000] uppercase tracking-tighter mb-4 italic">
              Report <span className="text-[#7352ab]">Lost</span> Item
            </h2>
            <p className="text-slate-500 uppercase tracking-[0.3em] text-[18px] font-black opacity-70">
              Help the community find what you've lost
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Item Name</label>
                <input 
                  name="title" 
                  placeholder="e.g., iPhone 15 Pro" 
                  onChange={handleChange} 
                  className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all placeholder:text-white/5 text-lg" 
                  required 
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Category</label>
                <select 
                  name="category" 
                  onChange={handleChange} 
                  className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all appearance-none text-slate-300" 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Keys">Keys</option>
                  <option value="Wallets">Wallets</option>
                  <option value="Bags">Bags</option>
                  <option value="Pets">Pets</option>
                  <option value="Documents">Documents</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Last Seen Location</label>
                <input name="location" placeholder="Library, Cafe, Park..." onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all placeholder:text-white/5" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Date Lost</label>
                <input type="date" name="date" onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all scheme-dark" required />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Description</label>
              <textarea 
                name="description" 
                placeholder="Distinctive marks, stickers, case color..." 
                onChange={handleChange} 
                className="bg-[#151515] border border-white/5 rounded-3xl p-6 h-40 focus:border-[#A180FF]/50 focus:outline-none transition-all resize-none placeholder:text-white/5" 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Contact Info</label>
                <input name="contact" placeholder="Email or WhatsApp" onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all placeholder:text-white/5" required />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[1px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Image Link</label>
                <input name="photoUrl" placeholder="Direct image link..." onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all placeholder:text-white/5" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 pt-10">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="flex-2 bg-white text-black py-7 rounded-2xl font-[1000] uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_30px_rgba(161,128,255,0.4)] transition-all"
              >
                Submit Report
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                onClick={() => navigate('/')} 
                className="flex-1 bg-transparent border border-white/10 text-white py-7 rounded-2xl font-[2000] uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportLost;