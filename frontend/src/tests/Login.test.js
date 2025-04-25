import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Pages/Login'; // Asegurate de que la ruta sea correcta

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);
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
 
//ACA EL TEST
describe('Login component', () => {
  test('renderiza correctamente el formulario de login', () => {
    renderWithRouter(<Login />);

    // Verifica el título del formulario
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();

    // Verifica los inputs por sus placeholders
    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();

    // Verifica el botón de envío
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });
});
