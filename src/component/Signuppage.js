import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaVenusMars } from 'react-icons/fa';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.includes('@')) newErrors.email = "Invalid email address";
    if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form Data:", formData);
      alert("Signed up successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
          </div>

          {/* Full Name */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FaPhone className="text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Gender */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FaVenusMars className="text-gray-400 mr-2" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-purple-600 font-medium">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
