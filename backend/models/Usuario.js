const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  tipo_usuario: { type: String, enum: ['paciente', 'medico', 'admin'], required: true },
  estado: { type: String, enum: ['activo', 'inactivo', 'suspendido'], default: 'activo' },
  ultimo_access: { type: Date }
}, { collection: 'Usuario' }); // <- aquí indicamos usar la colección existente

module.exports = mongoose.model('Usuario', UsuarioSchema);
