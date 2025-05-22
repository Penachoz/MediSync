import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

test('muestra el título principal', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const title = screen.getByText(/bienvenido a medisync/i);
  expect(title).toBeInTheDocument();
});