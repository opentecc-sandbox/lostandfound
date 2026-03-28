import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const ReportFoundItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    type: 'FOUND', 
    date: '',
    contact: '',
    photoUrl: '',
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
      alert('Found item reported! Thank you for helping.');
      navigate('/');
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      alert(error.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-[#7848d6]/26 blur-[150px] pointer-events-none z-0" />
      <div className="relative z-10 flex justify-center items-center pt-48 pb-32 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-[#111]/40 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] p-12 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="mb-16 text-center">
            <h2 className="text-6xl font-[1000] uppercase tracking-tighter mb-4 italic">
              Report <span className="text-[#5b4487]">Found</span> Item
            </h2>
            <p className="text-slate-500 uppercase tracking-[0.4em] text-[16px] font-black opacity-60">
              Provide details to reunite the owner with their item
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Item Name</label>
                <input 
                  name="title" 
                  placeholder="e.g., Gold Watch" 
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
                  className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all appearance-none text-slate-400" 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Keys">Keys</option>
                  <option value="Wallets">Wallets</option>
                  <option value="Documents">Documents</option>
                  <option value="Pets">Pets</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Location Found</label>
                <input name="location" placeholder="Found at..." onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all placeholder:text-white/5" />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Date Found</label>
                <input type="date" name="date" onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all scheme-dark" required />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Unique Marks</label>
              <textarea 
                name="description" 
                placeholder="Scratches, engravings, or specific details..." 
                onChange={handleChange} 
                className="bg-[#151515] border border-white/5 rounded-3xl p-6 h-40 focus:border-[#A180FF]/50 focus:outline-none transition-all resize-none placeholder:text-white/5" 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Your Contact</label>
                <input name="contact" placeholder="Phone or Email" onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all placeholder:text-white/5" required />
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-[16px] uppercase tracking-[0.4em] font-black text-slate-500 ml-4">Image Link</label>
                <input name="photoUrl" placeholder="https://..." onChange={handleChange} className="bg-[#151515] border border-white/5 rounded-2xl p-6 focus:border-[#A180FF]/50 focus:outline-none transition-all placeholder:text-white/5" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 pt-10">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="flex-2 bg-[#A180FF] text-white py-7 rounded-2xl font-[2000] uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_40px_rgba(161,128,255,0.4)] transition-all"
              >
                Submit Found Report
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                onClick={() => navigate('/')} 
                className="flex-1 bg-transparent border border-white/10 text-white py-7 rounded-2xl font-[1000] uppercase tracking-[0.2em] text-sm transition-all"
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

export default ReportFoundItem;