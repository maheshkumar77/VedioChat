import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const InputField = ({ icon: Icon, type, name, value, onChange, placeholder, error, toggleVisibility }) => (
  <div className="mb-4 relative">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <Icon />
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full pl-10 pr-10 py-3 rounded-lg border bg-white bg-opacity-50 backdrop-blur-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {toggleVisibility && (
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
      >
        {type === 'password' ? <FaEye /> : <FaEyeSlash />}
      </button>
    )}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const FloatingElements = () => {
  const colors = ['bg-white', 'bg-blue-300', 'bg-purple-300', 'bg-indigo-200', 'bg-pink-200'];
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${colors[i % colors.length]} opacity-20`}
          style={{
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            top: `${10 + i * 12}%`,
            left: `${5 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
            rotate: [0, 360],
          }}
          transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
};

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingElements />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-8 transition duration-300 hover:shadow-3xl">
          <motion.h1
            className="text-4xl font-extrabold text-center text-gray-800 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Welcome Back
          </motion.h1>
          <motion.p
            className="text-center text-gray-600 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Login to your account
          </motion.p>

          <form onSubmit={handleSubmit}>
            <InputField
              icon={FiMail}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              error={errors.email}
            />
            <InputField
              icon={FaLock}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              error={errors.password}
              toggleVisibility={() => setShowPassword(!showPassword)}
            />

            <div className="flex justify-between items-center mb-6 text-sm text-gray-700">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <button
                type="button"
                onClick={() => alert('Reset password')}
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="my-6 text-center text-gray-500 text-sm relative">
            <span className="bg-white px-2 rounded">Or continue with</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[FaGoogle, FaTwitter, FaGithub].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="bg-white bg-opacity-60 hover:bg-opacity-90 p-3 rounded-xl flex justify-center shadow transition"
              >
                <Icon className="text-xl text-gray-700" />
              </motion.button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => alert('Redirect to sign up')}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
