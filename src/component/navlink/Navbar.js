import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiArrowRight } from 'react-icons/fi';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'About', path: '/about' },
    { name: 'Users', path: '/total-users' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-600 transition-all duration-500"
            >
              Nexus
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden lg:flex items-center space-x-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {menuItems.map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="relative"
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  className="relative z-10 px-4 py-2 text-gray-700 font-medium hover:text-purple-600 transition-colors duration-300 flex items-center"
                >
                  {item.name}
                  <motion.span 
                    className="ml-1"
                    animate={{
                      x: hoveredItem === i ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <FiArrowRight size={14} />
                  </motion.span>
                </Link>
                {hoveredItem === i && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </motion.div>
            ))}
            
            <motion.div variants={itemVariants}>
              <Link
                to="/login"
                className="relative overflow-hidden group ml-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  <FiUser className="mr-2" />
                  Login
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Icon */}
          <motion.div 
            className="lg:hidden flex items-center"
            whileTap={{ scale: 0.9 }}
          >
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm shadow-sm focus:outline-none"
            >
              {isOpen ? (
                <FiX className="text-2xl text-purple-600" />
              ) : (
                <FiMenu className="text-2xl text-purple-600" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white/95 backdrop-blur-xl shadow-lg overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="px-6 py-4">
              {menuItems.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={mobileItemVariants}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    onClick={toggleMenu}
                    className="block py-4 text-gray-800 font-medium hover:text-purple-600 transition-colors duration-300 border-b border-gray-100 flex items-center"
                  >
                    <FiArrowRight className="mr-2 text-purple-500" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                custom={menuItems.length}
                variants={mobileItemVariants}
                className="mt-6"
              >
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <FiUser className="mr-2" />
                    Login
                  </span>
                </Link>
              </motion.div>

              <motion.div 
                className="flex justify-center space-x-6 mt-8 pt-6 border-t border-gray-100"
                custom={menuItems.length + 1}
                variants={mobileItemVariants}
              >
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                  <FaDiscord size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300">
                  <FaGithub size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;