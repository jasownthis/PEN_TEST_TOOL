import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import * as api from '../lib/api';

export default function Scanner() {
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { token } = useAuthStore();

  const handleScan = async (e) => {
    e.preventDefault();
    if (!target) return;

    setIsScanning(true);
    try {
      const result = await api.analyzeScan(target, token);
      console.log('Scan result:', result);
      // Handle scan results here
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section id="scan" className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800"
        >
          <div className="text-center mb-10">
            <Shield className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Security Scanner
            </h2>
            <p className="text-gray-400">
              Enter an IP address or domain to begin your security analysis
            </p>
          </div>

          <form onSubmit={handleScan} className="space-y-6">
            <div>
              <label 
                htmlFor="target" 
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Target IP or Domain
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter IP address or domain name"
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>Only scan systems you have permission to test</span>
            </div>

            <button
              type="submit"
              disabled={isScanning || !target}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 
                ${isScanning || !target
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                }`}
            >
              {isScanning ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Search className="h-5 w-5" />
                  </motion.div>
                  Scanning...
                </span>
              ) : (
                'Start Scan'
              )}
            </button>
          </form>

          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-gray-400">Analyzing target system...</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}