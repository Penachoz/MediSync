// models/Medico.js
const mongoose = require('mongoose');

const MedicoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  especialidad: { type: String, required: true },
  licencia_medica: { type: String, required: true, unique: true },
  datos_contacto: {
    email: { type: String, required: true },
    telefono: { type: String },
    direccion: { type: String }
  },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
}, { timestamps: true });

module.exports = mongoose.model('Medico', MedicoSchema);