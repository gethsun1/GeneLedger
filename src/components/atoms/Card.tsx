import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'elevated';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700',
    glass: 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50',
    elevated: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-xl'
  };

  return (
    <motion.div
      className={`rounded-2xl shadow-lg transition-all duration-300 ${variants[variant]} ${hover ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? { 
        y: -8, 
        shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        scale: 1.02
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default Card;