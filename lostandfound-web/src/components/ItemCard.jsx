import React from 'react';
import { motion } from 'framer-motion';

const ItemCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -15 }}
      className="bg-[#111]  m-2 p-10 rounded-[20px] border border-white/5 overflow-hidden group transition-all hover:border-[#A180FF]/30"
    >
      <div className="h-90 bg-slate-900 relative overflow-hidden">
        <img
          src={item.image ? `http://localhost:5000/${item.image}` : 'https://media.istockphoto.com/id/1471425948/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=170667a&w=0&k=20&c=Tq41AqeDgGeaYRfRrD4yc6AqGPrVfdscVU3--1ZNiHg='}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
          alt={item.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent"></div>
      </div>

      <div className="p-12  text-white">
        <h4 className="text-3xl font-normal uppercase tracking-tighter mb-4">{item.type} {item.title}</h4>
        <div className="flex items-center gap-4 text-[#9a87ba] mb-8 uppercase text-m font-bold tracking-widest">
          <div>📍 {item.location}</div>
          <div>📅{new Date(item.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;