const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const CitaMedica = require('../models/CitaMedica');

// Seteo de MongoDB en memoria
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await CitaMedica.deleteMany({});
});

describe('Modelo CitaMedica', () => {
  it('debería crear una cita médica válida', async () => {
    const pacienteId = new mongoose.Types.ObjectId();
    const medicoId = new mongoose.Types.ObjectId();
    const clinicaId = new mongoose.Types.ObjectId();

    const cita = new CitaMedica({
      paciente: pacienteId,
      medico: medicoId,
      clinica: clinicaId,
      fecha: new Date('2025-05-01'),
      hora_inicio: '10:30',
      duracion: 45,
      estado: 'pendiente',
      notas: 'Paciente con dolor de cabeza'
    });

    const savedCita = await cita.save();

    expect(savedCita._id).toBeDefined();
    expect(savedCita.duracion).toBe(45);
    expect(savedCita.estado).toBe('pendiente');
    expect(savedCita.notas).toBe('Paciente con dolor de cabeza');
  });

  it('debería fallar si falta un campo requerido', async () => {
    const cita = new CitaMedica({
      medico: new mongoose.Types.ObjectId(),
      clinica: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      hora_inicio: '11:00'
    });

    let error;
    try {
      await cita.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.paciente).toBeDefined();
  });
});
