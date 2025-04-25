import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App routing', () => {
  test('redirecciona a /login por defecto y muestra el título principal', () => {
    render(<App />);
    
    expect(screen.getByText('Bienvenido a MediSync')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Bienvenido a MediSync');
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('muestra el componente Register cuando la ruta es /register', () => {
    window.history.pushState({}, 'Register page', '/register');
    render(<App />);

    expect(screen.getByText('Bienvenido a MediSync')).toBeInTheDocument();
    expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
  });
});
