import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={`fixed right-6 bottom-6 p-3 ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-blue-400' 
              : 'bg-white hover:bg-gray-100 text-blue-600'
          } rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-gray-200 dark:border-gray-600 transition-colors duration-200`}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;