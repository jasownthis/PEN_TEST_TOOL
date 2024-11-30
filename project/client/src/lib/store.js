import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as api from './api';

// Define types as constants
const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      scans: [],
      isAuthenticated: false,

      // Auth actions
      login: async (email, password) => {
        try {
          // First, attempt login
          const { user, token } = await api.login(email, password);
          
          // Set initial state without scans
          set({ user, token, isAuthenticated: true, scans: [] });
          
          try {
            // Attempt to fetch scan history separately
            const scans = await api.getScanHistory(token);
            set({ scans });
          } catch (scanError) {
            console.warn('Failed to fetch scan history:', scanError);
            // Don't throw error here, just continue with empty scans
          }
        } catch (error) {
          console.error('Login error:', error);
          throw new Error(error.message || 'Login failed');
        }
      },

      register: async (name, email, password) => {
        try {
          const { user, token } = await api.register(name, email, password);
          set({ user, token, isAuthenticated: true, scans: [] });
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          scans: [], 
          isAuthenticated: false 
        });
      },

      // Scan actions
      addScan: async (scanData) => {
        try {
          const { token } = get();
          const newScan = await api.createScan(scanData, token);
          
          set((state) => ({
            scans: [newScan, ...state.scans]
          }));
          
          return newScan;
        } catch (error) {
          console.error('Add scan error:', error);
          throw error;
        }
      },

      updateScan: async (scanId, updateData) => {
        try {
          const { token } = get();
          const updatedScan = await api.updateScan(scanId, updateData, token);
          
          set((state) => ({
            scans: state.scans.map(scan => 
              scan._id === scanId ? updatedScan : scan
            )
          }));
          
          return updatedScan;
        } catch (error) {
          console.error('Update scan error:', error);
          throw error;
        }
      },

      deleteScan: async (scanId) => {
        try {
          const { token } = get();
          await api.deleteScan(scanId, token);
          
          set((state) => ({
            scans: state.scans.filter(scan => scan._id !== scanId)
          }));
        } catch (error) {
          console.error('Delete scan error:', error);
          throw error;
        }
      },

      // Utility functions
      getSeverityColor: (severity) => {
        switch (severity.toLowerCase()) {
          case SEVERITY_LEVELS.CRITICAL:
            return 'text-red-500';
          case SEVERITY_LEVELS.HIGH:
            return 'text-orange-500';
          case SEVERITY_LEVELS.MEDIUM:
            return 'text-yellow-500';
          case SEVERITY_LEVELS.LOW:
            return 'text-blue-500';
          default:
            return 'text-gray-500';
        }
      },

      // Fetch scan history
      fetchScanHistory: async () => {
        try {
          const { token } = get();
          if (!token) return;
          
          const history = await api.getScanHistory(token);
          set({ scans: history });
        } catch (error) {
          console.error('Fetch scan history error:', error);
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);