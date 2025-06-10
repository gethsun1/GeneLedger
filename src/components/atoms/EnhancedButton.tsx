import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  glow?: boolean;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  glow = false,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 
    disabled:cursor-not-allowed relative overflow-hidden group
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
      text-white focus:ring-purple-500 rounded-xl border border-purple-600/20
      shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]
      hover:shadow-[0_20px_25px_rgba(139,92,246,0.25),0_25px_50px_rgba(139,92,246,0.15)]
      ${glow ? 'shadow-[0_0_20px_rgba(139,92,246,0.3)]' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 
      text-white focus:ring-teal-500 rounded-xl border border-teal-600/20
      shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]
      hover:shadow-[0_20px_25px_rgba(20,184,166,0.25),0_25px_50px_rgba(20,184,166,0.15)]
    `,
    outline: `
      border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white 
      focus:ring-purple-500 dark:border-purple-400 dark:text-purple-400 rounded-xl
      backdrop-blur-xl bg-white/10 dark:bg-slate-800/10 border-white/30 dark:border-slate-700/50
      shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]
      hover:shadow-[0_20px_25px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.1)]
    `,
    ghost: `
      text-gray-700 hover:bg-gray-100/80 focus:ring-gray-500 dark:text-gray-300 
      dark:hover:bg-gray-800/80 backdrop-blur-sm rounded-xl
      hover:shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]
    `,
    glass: `
      backdrop-blur-xl bg-white/85 dark:bg-slate-800/85 border border-white/30 
      dark:border-slate-700/50 text-gray-900 dark:text-white rounded-xl
      shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]
      hover:shadow-[0_20px_25px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.1)]
      hover:bg-white/95 dark:hover:bg-slate-800/95
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Inner shadow effect */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)' }}
      />
      
      {/* Shimmer effect */}
      {(variant === 'primary' || variant === 'secondary') && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Noise texture for glass variant */}
      {variant === 'glass' && (
        <>
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay rounded-xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px'
            }}
          />
          <div 
            className="absolute inset-0 opacity-30 rounded-xl"
            style={{
              background: 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))'
            }}
          />
        </>
      )}
      
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default EnhancedButton;