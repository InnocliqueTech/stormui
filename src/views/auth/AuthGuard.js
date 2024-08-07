import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const user = sessionStorage.getItem('email');

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the child components
};

export default AuthGuard;
