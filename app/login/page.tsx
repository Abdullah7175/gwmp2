"use client";
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Enter Credentials Please..!');
      return;
    }
    setError('');
    // Add your login logic here
    console.log('Logging in...', { email, password });
  };

  return (
    
    <div className="sm:flex-col md:flex-row lg:flex-row mx-auto min-h-screen bg-gradient-to-r from-kwsc-green to-kwsc-blue">
      <div className="sm:flex-col md:flex-row lg:flex w-full mx-auto px-4 lg:px-8">
        {/* Left Section: Login Form */}
        <div className="w-full sm:w-11/12 md:w-9/12 lg:w-1/2 xl:w-1/3 p-6 sm:p-8 space-y-6 bg-white rounded-lg shadow-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/kl.png" alt="KWSC Logo" className="w-3/5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-kwsc-blue">GROUND WATER MANAGEMENT PORTAL</h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kwsc-blue transition duration-200"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kwsc-blue transition duration-200"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="w-4 h-4 text-kwsc-blue border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <a href="#" className="text-sm text-kwsc-blue hover:text-kwsc-light-blue">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 text-white bg-kwsc-blue rounded-lg hover:bg-kwsc-light-blue focus:outline-none focus:ring-2 focus:ring-kwsc-blue transition duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
        {/* Right Section: Advertisement */}
        <div className="w-full mx-auto px-4 lg:px-8 p-8 bg-transparent rounded-lg shadow-none ">
                <h3 className="text-2xl font-semibold text-center text-white mb-4">KARACHI WATER AND SEWERAGE CORPORATION</h3>
                <div className="flex justify-center">
                    <img src="/kws.jpg" alt="KWSC" className="w-full h-auto max-w-md" />
                </div>
                <p className="text-white text-lg leading-relaxed mb-6">
                    At the <span className="font-semibold">Karachi Water & Sewerage Corporation</span>, we are dedicated to
                    providing essential services to one of the largest and most vibrant cities in the world—
                    <span className="font-semibold">Karachi</span>. Serving a population of over 20 million residents, we manage the entire water cycle, from the production of bulk water to its distribution across the city. Our services also include the treatment and disposal of wastewater, ensuring that our community stays clean and healthy.
                </p>
                <p className="text-white text-lg leading-relaxed mb-6">
                    As the economic powerhouse of Pakistan, Karachi contributes approximately 70% of the nation’s revenue,
                    and we take pride in supporting this dynamic city by maintaining a reliable water supply and ensuring
                    the efficient collection of water tariffs. Our mission is to deliver sustainable, high-quality water and
                    wastewater management services that improve the quality of life for every citizen, while also
                    safeguarding the environment.
                </p>
                </div>
      </div>
    </div>
   
  );
};

export default LoginPage;
