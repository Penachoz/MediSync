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
  const [loading, setLoading] = useState(false);  // Estado para deshabilitar el botón mientras se envía

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { email, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return 'Por favor ingresa un correo electrónico válido.';
    }
    if (!password || password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return null;  // Todo está bien
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setMessageClass('message-error');
      setMessage(error);
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/usuarios/register', {
        username: form.email,
        password: form.password,
        tipo_usuario: 'paciente' // puedes cambiar según el rol
      });
      setMessageClass('message');
      setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      setForm({ email: '', password: '' });
    } catch (error) {
      setMessageClass('message-error');
      setMessage(error.response?.data?.msg || 'Error al registrar. ¿El usuario ya está registrado?');
    } finally {
      setLoading(false);  // Volver a habilitar el botón
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
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      {message && <p className={messageClass}>{message}</p>}
      <div className="redirect-link">
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
}

export default Register;
