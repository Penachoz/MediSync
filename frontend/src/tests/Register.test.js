import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('muestra error si el correo es inválido', async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByPlaceholderText(/correo electrónico/i), 'correo-malo');
  await userEvent.type(screen.getByPlaceholderText(/contraseña/i), '123456');
  await userEvent.click(screen.getByRole('button', { name: /registrar/i }));

  expect(await screen.findByText(/correo electrónico válido/i)).toBeInTheDocument();
});

test('muestra error si la contraseña tiene menos de 6 caracteres', async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByPlaceholderText(/correo electrónico/i), 'valido@correo.com');
  await userEvent.type(screen.getByPlaceholderText(/contraseña/i), '123');
  await userEvent.click(screen.getByRole('button', { name: /registrar/i }));

  expect(await screen.findByText(/al menos 6 caracteres/i)).toBeInTheDocument();
});

test('permite seleccionar tipo de usuario', async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const select = screen.getByRole('combobox');
  expect(select.value).toBe('paciente');

  await userEvent.selectOptions(select, 'medico');
  expect(select.value).toBe('medico');
});
