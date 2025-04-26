const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const HistorialMedico = require('../models/HistorialMedico');

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
  await HistorialMedico.deleteMany({});
});

describe('Modelo HistorialMedico', () => {
  it('debería crear un historial médico válido', async () => {
    const pacienteId = new mongoose.Types.ObjectId();
    const medicoId = new mongoose.Types.ObjectId();
    const citaId1 = new mongoose.Types.ObjectId();
    const citaId2 = new mongoose.Types.ObjectId();

    const historial = new HistorialMedico({
      paciente: pacienteId,
      citas: [citaId1, citaId2],
      diagnosticos: [
        {
          fecha: new Date('2024-05-01'),
          medico: medicoId,
          diagnostico: 'Gripe',
          tratamiento: 'Reposo y líquidos'
        }
      ],
      alergias: ['Polen', 'Penicilina'],
      medicamentos: [
        {
          nombre: 'Paracetamol',
          dosis: '500mg',
          frecuencia: 'Cada 8 horas'
        }
      ]
    });

    const savedHistorial = await historial.save();

    expect(savedHistorial._id).toBeDefined();
    expect(savedHistorial.diagnosticos.length).toBe(1);
    expect(savedHistorial.alergias).toContain('Polen');
    expect(savedHistorial.medicamentos[0].nombre).toBe('Paracetamol');
  });

  it('debería fallar si falta el paciente', async () => {
    const historial = new HistorialMedico({
      diagnosticos: [],
      alergias: [],
      medicamentos: []
    });

    let error;
    try {
      await historial.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.paciente).toBeDefined();
  });
});
