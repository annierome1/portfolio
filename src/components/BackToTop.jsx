import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        const scrollTop = mainContainer.scrollTop;
        const scrollHeight = mainContainer.scrollHeight;
        const clientHeight = mainContainer.clientHeight;
        
        // Show button when scrolled down more than 2 sections (2 * window height)
        const threshold = window.innerHeight * 3;
        setIsVisible(scrollTop > threshold);
      }
    };

    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.addEventListener('scroll', toggleVisibility);
      return () => mainContainer.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-purple-100/80 hover:bg-purple-200/80 text-purple-800 p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-purple-200/40"
      aria-label="Back to top"
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
