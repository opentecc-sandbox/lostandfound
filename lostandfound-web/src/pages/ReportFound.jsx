import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

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
    userId:localStorage.getItem('userId') || ''
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
      alert(error.response?.data?.error || "Check your backend terminal for errors");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#A180FF]">
      <Navbar />
      
      <div className="flex justify-center items-center pt-32 pb-20 px-4">
        <div className="w-full max-w-2xl bg-[#111111] border border-white/5 rounded-[2.5rem] p-10 md:p-16 shadow-2xl">
          
          <div className="mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
              Report <span className="text-[#A180FF]">Found</span> Item
            </h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">
              Provide details to help the owner find their item
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Item Name</label>
                <input 
                  name="title" 
                  placeholder="e.g., Gold Watch" 
                  onChange={handleChange} 
                  className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus:border-[#A180FF] focus:outline-none transition-all placeholder:text-white/10" 
                  required 
                />
              </div>

              {/* CATEGORY */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Category</label>
                <select 
                  name="category" 
                  onChange={handleChange} 
                  className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus:border-[#A180FF] focus:outline-none transition-all appearance-none" 
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

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Location Found</label>
                <input name="location" placeholder="e.g., Central Park" onChange={handleChange} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus:border-[#A180FF] focus:outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Date Found</label>
                <input type="date" name="date" onChange={handleChange} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus:border-[#A180FF] focus:outline-none transition-all scheme-dark" required />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Unique Marks</label>
              <textarea 
                name="description" 
                placeholder="Describe any scratches, engravings, or details..." 
                onChange={handleChange} 
                className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 h-32 focus:border-[#A180FF] focus:outline-none transition-all resize-none" 
              />
            </div>


            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Your Contact</label>
                <input name="contact" placeholder="Phone or Email" onChange={handleChange} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus:border-[#A180FF] focus:outline-none transition-all" required />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 ml-2">Image URL</label>
                <input name="photoUrl" placeholder="https://..." onChange={handleChange} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 focus:border-[#A180FF] focus:outline-none transition-all" />
              </div>
            </div>

            <div className="flex gap-6 pt-6">
              <button 
                type="submit" 
                className="flex-2 bg-[#A180FF] text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#8b5cf6] hover:scale-[1.02] transition-all shadow-xl shadow-[#A180FF]/10"
              >
                Submit Found Report
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/')} 
                className="flex-1 bg-transparent border border-white/10 text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportFoundItem;