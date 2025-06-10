import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white focus:ring-purple-500 shadow-lg hover:shadow-2xl border border-purple-600/20',
    secondary: 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white focus:ring-teal-500 shadow-lg hover:shadow-2xl border border-teal-600/20',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white focus:ring-purple-500 dark:border-purple-400 dark:text-purple-400 backdrop-blur-sm bg-white/10 dark:bg-slate-800/10',
    ghost: 'text-gray-700 hover:bg-gray-100/80 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800/80 backdrop-blur-sm',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === 'primary' || variant === 'secondary' 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : undefined
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect for primary and secondary buttons */}
      {(variant === 'primary' || variant === 'secondary') && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;