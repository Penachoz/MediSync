import { render, screen } from '@testing-library/react';
import Register from '../Pages/Register';
import { MemoryRouter } from 'react-router-dom';

// Simulamos el usuario admin antes del render
beforeEach(() => {
  localStorage.setItem(
    'usuario',
    JSON.stringify({ accesoSecreto: true })
  );
});

afterEach(() => {
  localStorage.clear();
});

test('muestra el formulario de registro si es admin', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /registro/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
});
//prueba