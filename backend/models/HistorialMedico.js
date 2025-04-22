// models/HistorialMedico.js
const mongoose = require('mongoose');

const HistorialMedicoSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  citas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CitaMedica' }],
  diagnosticos: [{
    fecha: { type: Date, required: true },
    medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico' },
    diagnostico: { type: String, required: true },
    tratamiento: { type: String }
  }],
  alergias: [{ type: String }],
  medicamentos: [{
    nombre: { type: String },
    dosis: { type: String },
    frecuencia: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('HistorialMedico', HistorialMedicoSchema);