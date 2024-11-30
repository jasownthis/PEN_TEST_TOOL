import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

// Feature Component
function Feature({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

export default function Hero() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Secure Your Digital Fortress
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Advanced vulnerability scanning and cybersecurity analysis to protect your systems
            from emerging threats.
          </p>

          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Get Started
              </Link>
            )}
            <a
              href="#features"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Feature
            icon={<Shield className="h-8 w-8 text-cyan-500" />}
            title="Real-time Protection"
            description="Continuous monitoring and instant threat detection to keep your systems safe."
          />
          <Feature
            icon={<Lock className="h-8 w-8 text-cyan-500" />}
            title="Advanced Security"
            description="Military-grade encryption and cutting-edge security protocols."
          />
          <Feature
            icon={<AlertCircle className="h-8 w-8 text-cyan-500" />}
            title="Threat Intelligence"
            description="Stay ahead of cyber threats with our advanced warning system."
          />
        </div>
      </div>
    </div>
  );
}