import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { glassCardStyle } from '../utils/styles'; 

const ItemCard = ({ item }) => {
  const [domRef, isVisible] = useReveal();

  return (
    <div 
      ref={domRef}
      className={`${glassCardStyle} p-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h3 className="text-white font-bold">{item.name}</h3>
    </div>
  );
};