// models/MedicoClinica.js
const mongoose = require('mongoose');

const MedicoClinicaSchema = new mongoose.Schema({
  medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  clinica: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinica', required: true },
  dias_atencion: [{ type: String, enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] }],
  horario_inicio: { type: String }, // Formato HH:MM
  horario_fin: { type: String }     // Formato HH:MM
}, { timestamps: true });

module.exports = mongoose.model('MedicoClinica', MedicoClinicaSchema);