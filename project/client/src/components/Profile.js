import { motion } from 'framer-motion';
import { useAuthStore } from '../lib/store';
import { History, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, scans, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Shield className="h-10 w-10 text-cyan-500 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <History className="h-6 w-6 text-cyan-500 mr-2" />
              <h3 className="text-xl font-semibold text-white">Recent Scans</h3>
            </div>
            
            <div className="space-y-4">
              {scans.length === 0 ? (
                <p className="text-gray-400">No recent scans</p>
              ) : (
                scans.map((scan) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-white">{scan.target}</h4>
                      <span className="text-sm text-gray-400">
                        {new Date(scan.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {scan.vulnerabilities.map((vuln) => (
                        <div
                          key={vuln.id}
                          className="bg-black/30 rounded p-3 border border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-white">{vuln.name}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium
                              ${vuln.severity === 'critical' ? 'bg-red-500/20 text-red-500' :
                                vuln.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                                vuln.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                                'bg-blue-500/20 text-blue-500'}`}
                            >
                              {vuln.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{vuln.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}