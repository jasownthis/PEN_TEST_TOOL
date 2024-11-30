import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/store';
import Header from './components/Header';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';




function PrivateRoute({ children }) {
  const { isAuthenticated, token } = useAuthStore();
  
  if (!token) {
    return <Navigate to="/auth" />;
  }

  return isAuthenticated ? children : (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Scanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;