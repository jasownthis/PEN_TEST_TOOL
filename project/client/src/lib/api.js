const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server error: Please try again later');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login API error:', error);
      if (error.message.includes('<!DOCTYPE')) {
        throw new Error('Server connection error. Please try again later.');
      }
      throw error;
    }
  }

export async function register(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to server. Please try again later.');
    }
    throw error;
  }
}

export async function analyzeScan(target, token) {
  const response = await fetch(`${API_URL}/scan/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ target }),
  });
  
  if (!response.ok) {
    throw new Error('Scan analysis failed');
  }
  
  return response.json();
}



export async function verifyToken(token) {
  const response = await fetch(`${API_URL}/auth/verify`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Token verification failed');
  }
  
  return response.json();
}

// Add these functions to your existing api.js

export const getScanHistory = async (token) => {
    const response = await fetch('/api/scans', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch scan history');
    return response.json();
  };
  
  export const createScan = async (scanData, token) => {
    const response = await fetch('/api/scans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(scanData)
    });
    if (!response.ok) throw new Error('Failed to create scan');
    return response.json();
  };
  
  export const updateScan = async (scanId, updateData, token) => {
    const response = await fetch(`/api/scans/${scanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) throw new Error('Failed to update scan');
    return response.json();
  };
  
  export const deleteScan = async (scanId, token) => {
    const response = await fetch(`/api/scans/${scanId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete scan');
    return response.json();
  };