import React from 'react';
import { Navigate } from 'react-router-dom';

function NavigateBasedOnAuth() {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.accesoSecreto ? <Navigate to="/register" /> : <Navigate to="/home" />;
    } catch (err) {
      // Token inválido, forzar login
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  }

  return <Navigate to="/login" />;
}

export default NavigateBasedOnAuth;
