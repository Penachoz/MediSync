import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const usuario = localStorage.getItem('usuario');

  if (!token || !usuario) return <Navigate to="/login" replace />;

  try {
    const payload = JSON.parse(usuario);

    // Evita que el admin entre a Home
    if (payload.accesoSecreto) return <Navigate to="/register" replace />;

    return children;
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
