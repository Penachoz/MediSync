import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Enviamos los datos de inicio de sesión al backend
      const res = await axios.post('http://localhost:5000/api/usuarios/login', {
        username: email, // backend espera "username"
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      setError('');

      // Decodificamos el token para saber si tiene acceso a /secreto
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.accesoSecreto) {
        alert('Bienvenido admin');
        navigate('/register');
      } else {
        alert('Login exitoso');
        navigate('/');
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit">Iniciar Sesión</button>
          {/* 
          <button type="button" className="register-btn" onClick={() => navigate('/register')}>
            Registrarse
          </button>
          */}
        </form>
      </div>
    </div>
  );
}

export default Login;
