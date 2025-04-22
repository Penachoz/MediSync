// controllers/citaMedicaController.js
const CitaMedica = require('../models/CitaMedica');

exports.crearCita = async (req, res) => {
  try {
    const nuevaCita = new CitaMedica(req.body);
    await nuevaCita.save();
    
    // Crear notificación
    const notificacion = new Notificacion({
      tipo_destinatario: 'paciente',
      destinatario: nuevaCita.paciente,
      contenido: `Su cita médica ha sido agendada para ${nuevaCita.fecha}`,
      canal: 'app'
    });
    await notificacion.save();
    
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerCitasPorPaciente = async (req, res) => {
  try {
    const citas = await CitaMedica.find({ paciente: req.params.pacienteId })
                                 .populate('medico', 'nombre apellido especialidad')
                                 .populate('clinica', 'nombre direccion');
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};