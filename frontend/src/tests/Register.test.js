import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Pages/Register';

test('muestra error si el email no es válido', async () => {
  render(<Register />);

  fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
    target: { value: 'noesemail' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
    target: { value: '123456' },
  });

  fireEvent.click(screen.getByText(/Registrar/i));

  const error = await screen.findByText(/correo electrónico válido/i);
  expect(error).toBeInTheDocument();
});
