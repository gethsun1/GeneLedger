import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeProvider from './components/ThemeProvider';
import Navigation from './components/molecules/Navigation';
import HeroSection from './components/organisms/HeroSection';
import ProtocolsSection from './components/organisms/ProtocolsSection';
import DAOSection from './components/organisms/DAOSection';
import NFTSection from './components/organisms/NFTSection';

function AppContent() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navigation isScrolled={isScrolled} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
        <ProtocolsSection />
        <DAOSection />
        <NFTSection />
        
        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-slate-950 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">GeneLedger</h3>
                <p className="text-gray-400">
                  Revolutionizing genomic research through decentralized collaboration and blockchain technology.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#protocols" className="hover:text-white transition-colors">Protocols</a></li>
                  <li><a href="#dao" className="hover:text-white transition-colors">DAO</a></li>
                  <li><a href="#nfts" className="hover:text-white transition-colors">NFTs</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Community</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">White Paper</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 GeneLedger. All rights reserved. Built with ❤️ for the genomic research community.</p>
            </div>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;