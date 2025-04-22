// models/Notificacion.js
const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
  tipo_destinatario: { type: String, enum: ['paciente', 'medico', 'admin'], required: true },
  destinatario: { type: mongoose.Schema.Types.ObjectId, required: true }, // Puede ser ID de paciente, médico o admin
  contenido: { type: String, required: true },
  canal: { type: String, enum: ['email', 'sms', 'app'], default: 'app' },
  estado: { type: String, enum: ['pendiente', 'enviada', 'leida'], default: 'pendiente' },
  fecha_envio: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Notificacion', NotificacionSchema);