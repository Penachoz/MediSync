import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Pages/Register';
import axios from 'axios';

jest.mock('axios'); // Mockeamos axios

const fillForm = (email, password) => {
  fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
    target: { value: password },
  });
};

describe('Register Form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('permite ingresar correo y contraseña', () => {
    render(<Register />);

    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('123456');
  });

  test('muestra error si el correo no contiene "@"', async () => {
    render(<Register />);

    fillForm('correo_invalido.com', '123456');
    fireEvent.click(screen.getByText(/registrar/i));

    const error = await screen.findByText(/correo electrónico válido/i);
    expect(error).toBeInTheDocument();
  });

  test('muestra error si la contraseña es muy corta', async () => {
    render(<Register />);

    fillForm('test@example.com', '123');
    fireEvent.click(screen.getByText(/registrar/i));

    const error = await screen.findByText(/contraseña debe tener al menos 6 caracteres/i);
    expect(error).toBeInTheDocument();
  });

  test('registro exitoso con credenciales válidas', async () => {
    axios.post.mockResolvedValueOnce({});

    render(<Register />);

    fillForm('user@test.com', 'password123');
    fireEvent.click(screen.getByText(/registrar/i));

    const successMessage = await screen.findByText(/registro exitoso/i);
    expect(successMessage).toBeInTheDocument();
  });

  test('muestra error si el registro falla', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { msg: 'Usuario ya existe' } }
    });

    render(<Register />);

    fillForm('user@test.com', 'password123');
    fireEvent.click(screen.getByText(/registrar/i));

    const error = await screen.findByText(/usuario ya existe/i);
    expect(error).toBeInTheDocument();
  });

  test('muestra error genérico si el registro falla sin mensaje específico', async () => {
    axios.post.mockRejectedValueOnce({});

    render(<Register />);

    fillForm('user@test.com', 'password123');
    fireEvent.click(screen.getByText(/registrar/i));

    const error = await screen.findByText(/error al registrar/i);
    expect(error).toBeInTheDocument();
  });
});
