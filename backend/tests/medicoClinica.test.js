const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const MedicoClinica = require('../models/MedicoClinica');

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
  await MedicoClinica.deleteMany({});
});

describe('Modelo MedicoClinica', () => {
  it('debería crear una relación válida entre médico y clínica', async () => {
    const medicoId = new mongoose.Types.ObjectId();
    const clinicaId = new mongoose.Types.ObjectId();

    const relacion = new MedicoClinica({
      medico: medicoId,
      clinica: clinicaId,
      dias_atencion: ['Lunes', 'Miércoles', 'Viernes'],
      horario_inicio: '08:00',
      horario_fin: '16:00'
    });

    const savedRelacion = await relacion.save();

    expect(savedRelacion._id).toBeDefined();
    expect(savedRelacion.dias_atencion).toContain('Lunes');
    expect(savedRelacion.horario_inicio).toBe('08:00');
  });

  it('debería fallar si falta el campo médico', async () => {
    const clinicaId = new mongoose.Types.ObjectId();

    const relacion = new MedicoClinica({
      clinica: clinicaId,
      dias_atencion: ['Martes'],
      horario_inicio: '09:00',
      horario_fin: '13:00'
    });

    let error;
    try {
      await relacion.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.medico).toBeDefined();
  });

  it('debería fallar si un día no es válido', async () => {
    const medicoId = new mongoose.Types.ObjectId();
    const clinicaId = new mongoose.Types.ObjectId();

    const relacion = new MedicoClinica({
      medico: medicoId,
      clinica: clinicaId,
      dias_atencion: ['Domingo'],
      horario_inicio: '10:00',
      horario_fin: '14:00'
    });

    let error;
    try {
      await relacion.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors['dias_atencion.0']).toBeDefined();
  });
});
