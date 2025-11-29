import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAuthSuccess = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    setLoading(false);
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials);
      const newToken = response.data.token;
      const userData = response.data.user;

      handleAuthSuccess(newToken, userData);
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err);
      throw err;
    }
  };

  const register = async (credentials) => {
    setLoading(true);
    try {
      const response = await authApi.register(credentials);
      // Assuming registration returns a token, which it should based on your controller
      const newToken = response.data.token;
      const userData = response.data.user;
      handleAuthSuccess(newToken, userData);
    } catch (err) {
      setLoading(false);
      console.error('Registration error:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.getMe();

        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          setToken(storedToken);
        } else {
          console.error('Invalid getMe response:', response.data);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        console.error('Error details:', error.response?.data);

        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        register,
        logout,
        handleAuthSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
