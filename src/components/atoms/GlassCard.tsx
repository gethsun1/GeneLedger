import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  intensity?: 'light' | 'medium' | 'strong';
  size?: 'sm' | 'md' | 'lg';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  intensity = 'medium',
  size = 'md'
}) => {
  const intensityStyles = {
    light: {
      background: 'rgba(255, 255, 255, 0.7)',
      darkBackground: 'rgba(30, 41, 59, 0.7)',
      blur: 'backdrop-blur-sm',
      border: 'border-white/20 dark:border-slate-700/30'
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.85)',
      darkBackground: 'rgba(30, 41, 59, 0.85)',
      blur: 'backdrop-blur-xl',
      border: 'border-white/30 dark:border-slate-700/50'
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.95)',
      darkBackground: 'rgba(30, 41, 59, 0.95)',
      blur: 'backdrop-blur-2xl',
      border: 'border-white/40 dark:border-slate-700/60'
    }
  };

  const sizeStyles = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl'
  };

  const currentIntensity = intensityStyles[intensity];

  return (
    <motion.div
      className={`
        relative overflow-hidden border ${currentIntensity.border} ${currentIntensity.blur} ${sizeStyles[size]}
        shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]
        hover:shadow-[0_20px_25px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.1)]
        transition-all duration-500 ease-out
        ${hover ? 'cursor-pointer' : ''} 
        ${className}
      `}
      style={{
        background: `linear-gradient(120deg, ${currentIntensity.background}, rgba(255,255,255,0.6))`,
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))'
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}
      />
      
      {/* Dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Diagonal stripe pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 8px)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;