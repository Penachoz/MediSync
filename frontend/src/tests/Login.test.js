import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import axios from 'axios';

// Mockear axios
jest.mock('axios');

// Mockear useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

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
 

describe('Componente Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderWithRouter = (ui) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renderiza correctamente el formulario', () => {
    renderWithRouter(<Login />);
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('no envía el formulario si los campos están vacíos', async () => {
    renderWithRouter(<Login />);
    const button = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.click(button);

    // Como los inputs son required, el navegador bloqueará el envío.
    // No se hará la petición axios.post.
    expect(axios.post).not.toHaveBeenCalled();
  });

  test('muestra error si el correo es inválido', async () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByPlaceholderText(/correo/i);

    fireEvent.change(emailInput, { target: { value: 'correo-invalido' } });
    fireEvent.blur(emailInput);

    expect(emailInput.validity.valid).toBe(false);
  });

  test('envía datos válidos correctamente', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'fake-jwt-token' } });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'usuario@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    });
  });

  test('redirige a /register si el accesoSecreto es true', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'fake-jwt-token' } });

    // Mock del payload decodificado
    global.atob = jest.fn().mockReturnValueOnce(JSON.stringify({ accesoSecreto: true }));

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'admin@secreto.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/register');
    });
  });

  test('redirige a / si el accesoSecreto es false', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'fake-jwt-token' } });

    global.atob = jest.fn().mockReturnValueOnce(JSON.stringify({ accesoSecreto: false }));

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'usuario@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('muestra mensaje de error si la API falla', async () => {
    axios.post.mockRejectedValueOnce(new Error('Error de servidor'));

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: 'usuario@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(await screen.findByText(/correo o contraseña incorrectos/i)).toBeInTheDocument();
  });
});
