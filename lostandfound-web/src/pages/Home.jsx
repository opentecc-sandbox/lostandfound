import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // PROTECTION LOGIC: If no token exists, redirect to Login
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  if (!token) return null; // Don't show anything while redirecting

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-cyan-600">Lost & Found</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 hidden sm:block">Welcome to Lost & Found</span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
          <p className="text-gray-600">
            Your trusted platform for reuniting lost items with their owners. Help others and get help when you need it most.
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-cyan-50 border border-cyan-100 rounded-xl">
              <h3 className="font-bold text-cyan-800">Report an Item</h3>
              <p className="text-sm text-cyan-700">Found something? Add it to the list.</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <h3 className="font-bold text-emerald-800">Search Items</h3>
              <p className="text-sm text-emerald-700">Look for something you lost.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;