// models/Paciente.js
const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fecha_nacimiento: { type: Date, required: true },
  genero: { type: String, enum: ['masculino', 'femenino', 'otro'] },
  datos_contacto: {
    email: { type: String, required: true },
    telefono: { type: String },
    direccion: { type: String }
  },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
}, { timestamps: true });

module.exports = mongoose.model('Paciente', PacienteSchema);