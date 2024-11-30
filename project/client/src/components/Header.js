import React, { useState } from 'react';
import { Shield, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';

// NavLink Component
function NavLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`text-gray-300 hover:text-cyan-500 transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}

// MobileNavLink Component
function MobileNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyan-500 hover:bg-gray-900 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className="ml-2 text-xl font-bold text-white">CyberSentinel</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-400 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/#features">Features</NavLink>
                <NavLink to="/#how-it-works">How it Works</NavLink>
                <NavLink 
                  to="/auth" 
                  className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
                >
                  Sign In
                </NavLink>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-cyan-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95">
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
                <MobileNavLink to="/profile">Profile</MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:text-red-400 hover:bg-gray-900 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/#features">Features</MobileNavLink>
                <MobileNavLink to="/#how-it-works">How it Works</MobileNavLink>
                <MobileNavLink to="/auth">Sign In</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}