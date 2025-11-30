import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token, user, loading } = useAuth();

  // console.log('ProtectedRoute - token:', token);
  // console.log('ProtectedRoute - user:', user);
  // console.log('ProtectedRoute - loading:', loading);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>
          <h2>Loading...</h2>
          <p>Checking authentication status...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    console.log('❌ No token found in context, redirecting to login');

    return <Navigate to="/login" replace />;
  }
  if (token && !user) {
    console.log(
      '⚠️ Token exists but user data not loaded, redirecting to login'
    );
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
