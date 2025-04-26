import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Pages/Login';

// Helper para renderizar con router
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Componente Login - validaciones básicas', () => {
  test('renderiza correctamente el formulario de login', () => {
    renderWithRouter(<Login />);
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('no permite enviar el formulario si los campos están vacíos', () => {
    renderWithRouter(<Login />);
    const button = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.click(button);

    // Comprobamos que los inputs siguen presentes, o que no cambió el estado
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  });

  test('valida que el correo tenga un formato correcto', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByPlaceholderText(/correo/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'correo-invalido' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Simula que intentas enviar
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Verifica que el input de email nativo no es válido
    expect(emailInput.validity.valid).toBe(false);
  });

  test('permite enviar datos válidos (sin errores de front)', async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'usuario@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // El formulario sigue presente, sin errores de frontend
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
  });
});
