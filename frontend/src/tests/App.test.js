import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

// Mock de los componentes de las páginas para simplificar las pruebas
jest.mock('../Pages/Login', () => () => <div>Login Page Mock</div>);
jest.mock('../Pages/Register', () => () => <div>Register Page Mock</div>);
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (
      msg.includes('React Router Future Flag Warning') ||
      msg.includes('v7_startTransition') ||
      msg.includes('v7_relativeSplatPath')
    ) {
      return;
    }
    console.warn(msg); // mostrar otros warnings normales si querés
  });
});
 

describe('App Component', () => {
  test('renders the welcome heading', () => {
    render(
        <App />
    );
    
    expect(screen.getByText('Bienvenido a MediSync')).toBeInTheDocument();
  });

  test('redirects from root path to /login', () => {
    window.history.pushState({}, '', '/');
    
    render(
        <App />
    );
    
    expect(window.location.pathname).toBe('/login');
  });

  test('renders Login component at /login path', () => {
    window.history.pushState({}, '', '/login');
    
    render(
        <App />
    );
    
    expect(screen.getByText('Login Page Mock')).toBeInTheDocument();
  });

  test('renders Register component at /register path', () => {
    window.history.pushState({}, '', '/register');
    
    render(
        <App />
    );
    
    expect(screen.getByText('Register Page Mock')).toBeInTheDocument();
  });
});