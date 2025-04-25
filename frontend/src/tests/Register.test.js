import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';

test('muestra error si el email no es válido', () => {
  render(<Register />);
  fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
    target: { value: 'noesemail' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
    target: { value: '123456' },
  });
  fireEvent.click(screen.getByText(/Registrarse/i));
  expect(screen.getByText(/correo electrónico válido/i)).toBeInTheDocument();
});
