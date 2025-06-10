import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Dna } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import EnhancedButton from '../atoms/EnhancedButton';

interface GlassNavigationProps {
  isScrolled: boolean;
}

const GlassNavigation: React.FC<GlassNavigationProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Protocols', href: '#protocols' },
    { name: 'DAO', href: '#dao' },
    { name: 'NFTs', href: '#nfts' },
    { name: 'About', href: '#about' },
  ];

  return (
    <motion.nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? `backdrop-blur-2xl border-b border-white/30 dark:border-slate-700/50
             shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]` 
          : 'bg-transparent'
        }
      `}
      style={isScrolled ? {
        background: 'linear-gradient(120deg, rgba(255,255,255,0.85), rgba(255,255,255,0.7))',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
      } : {}}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Noise texture overlay for scrolled state */}
      {isScrolled && (
        <>
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px'
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <Dna className="w-8 h-8 text-purple-600 drop-shadow-lg" />
              <motion.div
                className="absolute inset-0 w-8 h-8 bg-purple-600/20 rounded-full blur-md"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide drop-shadow-sm">
              GeneLedger
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all duration-300 drop-shadow-sm"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full shadow-lg"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`
                p-2.5 rounded-xl backdrop-blur-xl border border-white/30 dark:border-slate-700/50
                text-gray-700 dark:text-gray-300 transition-all duration-300
                shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.05)]
                hover:shadow-[0_20px_25px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.1)]
              `}
              style={{
                background: 'linear-gradient(120deg, rgba(255,255,255,0.85), rgba(255,255,255,0.7))',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              aria-label="Toggle theme"
            >
              {theme.name === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <EnhancedButton variant="glass" size="sm" glow>
                Connect Wallet
              </EnhancedButton>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`
              md:hidden p-2 rounded-lg backdrop-blur-sm border border-white/20 dark:border-slate-700/30
              text-gray-700 dark:text-gray-300 transition-all duration-200
              shadow-[0_4px_6px_rgba(0,0,0,0.1)]
            `}
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`
                md:hidden absolute top-16 left-0 right-0 backdrop-blur-2xl border-t border-white/30 
                dark:border-gray-700/50 shadow-[0_20px_25px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.1)]
              `}
              style={{
                background: 'linear-gradient(120deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Mobile menu textures */}
              <div 
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundSize: '256px 256px'
                }}
              />
              
              <div className="px-4 py-6 space-y-4 relative z-10">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium py-2 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <motion.button
                    onClick={toggleTheme}
                    className={`
                      p-2 rounded-lg backdrop-blur-sm border border-white/20 dark:border-slate-700/30
                      text-gray-700 dark:text-gray-300 transition-all duration-200
                      shadow-[0_4px_6px_rgba(0,0,0,0.1)]
                    `}
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle theme"
                  >
                    {theme.name === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </motion.button>
                  <EnhancedButton variant="glass" size="sm">
                    Connect Wallet
                  </EnhancedButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default GlassNavigation;