import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, Database } from 'lucide-react';
import Button from '../atoms/Button';

const HeroSection: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-r from-purple-200/30 to-teal-200/30 dark:from-purple-900/30 dark:to-teal-900/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-purple-400/20 dark:bg-purple-300/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={fadeIn} className="space-y-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-teal-600 to-green-600 bg-clip-text text-transparent leading-tight tracking-wide"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Decentralized
              <br />
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Genomic Research
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Revolutionizing scientific collaboration through blockchain technology, 
              where researchers share protocols, verify results, and govern the future of genomics together.
            </motion.p>
          </motion.div>

          {/* Enhanced Feature Icons */}
          <motion.div 
            variants={fadeIn}
            className="flex justify-center items-center space-x-8 py-8"
          >
            {[
              { icon: Database, label: 'Protocols', color: 'from-blue-500 to-cyan-500' },
              { icon: Shield, label: 'Verified', color: 'from-green-500 to-emerald-500' },
              { icon: Users, label: 'DAO', color: 'from-purple-500 to-pink-500' },
              { icon: Zap, label: 'Fast', color: 'from-yellow-500 to-orange-500' },
            ].map(({ icon: Icon, label, color }, index) => (
              <motion.div
                key={label}
                className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400"
                whileHover={{ scale: 1.15, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                custom={index}
              >
                <motion.div 
                  className={`p-4 bg-gradient-to-br ${color} rounded-2xl shadow-lg backdrop-blur-sm border border-white/20`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" size="lg" className="px-8 py-4 text-lg">
                <span className="mr-2">Explore Protocols</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Join the DAO
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div 
            variants={fadeIn}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            {[
              { value: '2,847', label: 'Protocols Shared', color: 'text-purple-600' },
              { value: '15,632', label: 'Verifications', color: 'text-teal-600' },
              { value: '892', label: 'Researchers', color: 'text-green-600' },
              { value: '$2.4M', label: 'Funding Distributed', color: 'text-orange-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-gray-400/50 dark:border-gray-600/50 rounded-full flex justify-center backdrop-blur-sm bg-white/10 dark:bg-slate-800/10"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-purple-500 to-teal-500 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;