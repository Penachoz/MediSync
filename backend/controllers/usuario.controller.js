const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Correo del admin para registrar
const CORREO_SECRETO = "admin@secreto.com";//123456

// Función de validación para datos de registro
const validarRegistro = (username, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!username || !emailRegex.test(username)) {
    return 'Por favor ingresa un correo electrónico válido.';
  }
  if (!password || password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return null;
};

exports.registrar = async (req, res) => {
  try {
    console.log("Cuerpo recibido:", req.body);

    const { username, password, tipo_usuario, estado } = req.body;

    // Validación de los datos
    const error = validarRegistro(username, password);
    if (error) {
      return res.status(400).json({ msg: error });
    }

    // Comprobamos si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'El correo electrónico ya está registrado.' });
    }

    // Encriptamos la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      username,
      password_hash, // Usar password_hash en lugar de password
      tipo_usuario,
      estado: estado || 'activo',
      ultimo_access: new Date()
    });

    await usuario.save();
    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ msg: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación de datos de entrada
    if (!username || !password) {
      return res.status(400).json({ msg: 'El correo y la contraseña son obligatorios.' });
    }

    const usuario = await Usuario.findOne({ username });

    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.password_hash); // Cambié esto a password_hash
    if (!valido) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    usuario.ultimo_access = new Date();
    await usuario.save();

    // Solo este usuario tendrá acceso a la página secreta
    const esSecreto = usuario.username === CORREO_SECRETO;

    const token = jwt.sign(
      {
        id: usuario._id,
        username: usuario.username,
        tipo: usuario.tipo_usuario,
        accesoSecreto: esSecreto // <-- clave que usarás en el frontend
      },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.json({ msg: 'Login exitoso', token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ msg: 'Error en el login' });
  }
};
