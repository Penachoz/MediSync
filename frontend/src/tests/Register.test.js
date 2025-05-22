import { render, screen } from '@testing-library/react';
import Register from '../Pages/Register';
import { MemoryRouter } from 'react-router-dom';

test('renderiza formulario de registro', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /registrarse/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
});