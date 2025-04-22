// models/Usuario.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  tipo_usuario: { type: String, enum: ['admin', 'medico', 'paciente'], required: true },
  estado: { type: String, default: 'activo' },
  ultimo_access: { type: Date }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);