import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    tipo_usuario: 'paciente'
  });
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.accesoSecreto) {
      setUsuarioLogueado(usuario);
    } else {
      navigate('/login'); // Redirige si no es admin
    }
  }, [navigate]);

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
    return null;
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
        tipo_usuario: form.tipo_usuario
      });

      setMessageClass('message');
      setMessage('Registro exitoso.');

      setForm({ email: '', password: '', tipo_usuario: 'paciente' });
    } catch (error) {
      setMessageClass('message-error');
      setMessage(error.response?.data?.msg || 'Error al registrar. ¿El usuario ya está registrado?');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUsuarioLogueado(null);
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Registro (Solo Admin)</h2>

      {usuarioLogueado && (
        <>

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
            <select
              name="tipo_usuario"
              value={form.tipo_usuario}
              onChange={handleChange}
              required
            >
              <option value="medico">Médico</option>
              <option value="paciente">Paciente</option>
            </select>
            <br />
            <button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </form>
        </>
      )}
      
      {message && <p className={messageClass}>{message}</p>}
    </div>
  );
}

export default Register;
