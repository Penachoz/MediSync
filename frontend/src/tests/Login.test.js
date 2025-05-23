import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Pages/Login';
import { MemoryRouter } from 'react-router-dom';

test('muestra el formulario de login', () => {
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

test('muestra error si los campos están vacíos', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

  expect(await screen.findByText(/todos los campos son obligatorios/i)).toBeInTheDocument();
});

test('muestra error si solo el correo está lleno', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByPlaceholderText(/correo/i), 'usuario@correo.com');
  await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

  expect(await screen.findByText(/todos los campos son obligatorios/i)).toBeInTheDocument();
});

test('muestra error si solo la contraseña está llena', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByPlaceholderText(/contraseña/i), '123456');
  await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

  expect(await screen.findByText(/todos los campos son obligatorios/i)).toBeInTheDocument();
});
