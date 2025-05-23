import { render, screen } from '@testing-library/react';
import App from '../App';

test('muestra el título de bienvenida', () => {
  render(<App />);
  const title = screen.getByText(/bienvenido a medisync/i);
  expect(title).toBeInTheDocument();
});
//prueba