import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Dna } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Button from '../atoms/Button';

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-slate-700/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
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
            >
              <Dna className="w-8 h-8 text-purple-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">
              GeneLedger
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full"
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
              className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 dark:border-gray-700/50"
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
              <Button variant="primary" size="sm" className="shadow-lg hover:shadow-xl">
                Connect Wallet
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
              className="md:hidden absolute top-16 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl border-t border-white/20 dark:border-gray-700/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
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
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle theme"
                  >
                    {theme.name === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  </motion.button>
                  <Button variant="primary" size="sm">
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;