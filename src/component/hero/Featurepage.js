import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { features } from '../data/data';

const FeatureCard = ({ feature = {}, controls }) => {
  // Provide default empty object to prevent undefined errors
  const { 
    icon = "✅", 
    para = "Feature Title", 
    heading = "Feature description", 
    stats = "Stats", 
    color = "bg-gray-100 text-gray-600" 
  } = feature;

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ y: -10 }}
      className={`p-8 rounded-2xl shadow-lg ${color} transition-all duration-300 hover:shadow-xl`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{para}</h3>
      <p className="text-gray-700 mb-4">{heading}</p>
      <span className="inline-block px-3 py-1 rounded-full bg-white text-sm font-medium">
        {stats}
      </span>
    </motion.div>
  );
};

const FeaturesPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          variants={titleVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for seamless video communication and collaboration
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features && features.map((feature) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              controls={controls} 
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-24 bg-white rounded-2xl shadow-xl p-8 sm:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-purple-600 mb-2">10M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to transform your communication?
          </h3>
          <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-lg">
            Get Started for Free
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;