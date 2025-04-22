// models/CitaMedica.js
const mongoose = require('mongoose');

const CitaMedicaSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  clinica: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinica', required: true },
  fecha: { type: Date, required: true },
  hora_inicio: { type: String, required: true }, // Formato HH:MM
  duracion: { type: Number, default: 30 }, // Duración en minutos
  estado: { type: String, enum: ['pendiente', 'confirmada', 'completada', 'cancelada'], default: 'pendiente' },
  notas: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CitaMedica', CitaMedicaSchema);