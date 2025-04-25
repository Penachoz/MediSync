const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Correo del admin para registrar
const CORREO_SECRETO = "admin@secreto.com";

exports.registrar = async (req, res) => {
  try {
    console.log("Cuerpo recibido:", req.body);

    const { username, password, tipo_usuario, estado } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      username,
      password_hash,
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
    const usuario = await Usuario.findOne({ username });

    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, usuario.password_hash);
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
