import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Pages/Register';

const fillForm = (email, password) => {
  fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
    target: { value: password },
  });
};

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


test('registro exitoso con credenciales válidas', async () => {
  render(<Register />);

  fillForm('user@test.com', 'password123');
  fireEvent.click(screen.getByText(/registrar/i));

  // Aquí podrías esperar un mensaje de éxito, redirección o un mock de axios
  // Por ejemplo, si usas alertas:
  // expect(window.alert).toHaveBeenCalledWith('Registro exitoso');
});