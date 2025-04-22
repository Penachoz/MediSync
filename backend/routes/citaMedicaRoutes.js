// routes/citaMedicaRoutes.js
const express = require('express');
const router = express.Router();
const citaMedicaController = require('../controllers/citaMedicaController');

router.post('/', citaMedicaController.crearCita);
router.get('/paciente/:pacienteId', citaMedicaController.obtenerCitasPorPaciente);

module.exports = router;