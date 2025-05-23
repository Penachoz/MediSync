import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const usuario = localStorage.getItem('usuario');

  if (!token || !usuario) return <Navigate to="/login" replace />;

  try {
    const payload = JSON.parse(usuario);

    // Solo admins con accesoSecreto pueden ver Register
    if (payload.accesoSecreto) {
      return children;
    } else {
      return <Navigate to="/home" replace />;
    }
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;
