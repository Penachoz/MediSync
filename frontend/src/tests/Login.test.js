import { render, screen } from '@testing-library/react';
import Login from '../Pages/Login';
import { MemoryRouter } from 'react-router-dom';

test('renderiza formulario de login', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
});