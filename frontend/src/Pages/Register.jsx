import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form);
      setMessageClass('message');
      setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      setForm({ email: '', password: '' });
    } catch (error) {
      setMessageClass('message-error');
      setMessage('Error al registrar. ¿El correo ya está registrado?');
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p className={messageClass}>{message}</p>}
      <div className="redirect-link">
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
}

export default Register;
