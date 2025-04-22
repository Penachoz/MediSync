// models/Clinica.js
const mongoose = require('mongoose');

const ClinicaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  ciudad: { type: String, required: true },
  datos_contacto: {
    telefono: { type: String, required: true },
    email: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Clinica', ClinicaSchema);