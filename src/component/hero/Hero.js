import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { imagess } from "../data/data";

const Hero = () => {
  const controls = useAnimation();
  const [activeImage, setActiveImage] = useState(0);
  const images = imagess.slice(0, 5); // Use first 5 images from your data

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Start animations on load
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 12, stiffness: 100 } }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-lg"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              delay: i * 0.2,
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight" variants={itemVariants}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Next-Gen
              </span>{' '}
              Video Chat Experience
            </motion.h1>

            <motion.p className="text-xl text-gray-300" variants={itemVariants}>
              Crystal clear video, ultra-low latency, and AI-powered features that make every conversation feel face-to-face.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-medium">
                Start Free Call
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
                See Features
              </button>
            </motion.div>

            <motion.div className="flex items-center gap-4 pt-4" variants={itemVariants}>
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-purple-500"
                    style={{
                      zIndex: 5 - i,
                      backgroundImage: `url(https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i+10}.jpg)`,
                      backgroundSize: 'cover',
                    }}
                  />
                ))}
              </div>
              <div className="text-gray-300">
                <p className="font-medium">Join 10,000+ happy users</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2">5.0 (2k reviews)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Gallery */}
          <div className="lg:w-1/2 relative">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage]?.img}
                  alt="Video chat interface"
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              </AnimatePresence>

              {/* Floating call buttons */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                {['red', 'green', 'blue'].map((color, i) => (
                  <motion.div
                    key={i}
                    className={`w-12 h-12 rounded-full bg-${color}-500 flex items-center justify-center shadow-lg cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image selector dots */}
            <div className="flex justify-center gap-3 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeImage === index ? 'bg-white w-6' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;