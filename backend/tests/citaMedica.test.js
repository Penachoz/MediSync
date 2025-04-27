const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const CitaMedica = require('../models/CitaMedica');

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

  it('debería asignar valores por defecto correctamente', async () => {
    const pacienteId = new mongoose.Types.ObjectId();
    const medicoId = new mongoose.Types.ObjectId();
    const clinicaId = new mongoose.Types.ObjectId();

    const cita = new CitaMedica({
      paciente: pacienteId,
      medico: medicoId,
      clinica: clinicaId,
      fecha: new Date('2025-05-10'),
      hora_inicio: '09:00',
    });

    const savedCita = await cita.save();

    expect(savedCita.duracion).toBe(30);
    expect(savedCita.estado).toBe('pendiente');
  });

  it('debería fallar si el estado no es válido', async () => {
    const pacienteId = new mongoose.Types.ObjectId();
    const medicoId = new mongoose.Types.ObjectId();
    const clinicaId = new mongoose.Types.ObjectId();

    const cita = new CitaMedica({
      paciente: pacienteId,
      medico: medicoId,
      clinica: clinicaId,
      fecha: new Date(),
      hora_inicio: '12:00',
      estado: 'inexistente'
    });

    let error;
    try {
      await cita.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.estado).toBeDefined();
  });

  it('debería fallar si falta hora_inicio', async () => {
    const pacienteId = new mongoose.Types.ObjectId();
    const medicoId = new mongoose.Types.ObjectId();
    const clinicaId = new mongoose.Types.ObjectId();

    const cita = new CitaMedica({
      paciente: pacienteId,
      medico: medicoId,
      clinica: clinicaId,
      fecha: new Date()
    });

    let error;
    try {
      await cita.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.hora_inicio).toBeDefined();
  });

  it('debería fallar si fecha no es una fecha válida', async () => {
    const pacienteId = new mongoose.Types.ObjectId();
    const medicoId = new mongoose.Types.ObjectId();
    const clinicaId = new mongoose.Types.ObjectId();

    const cita = new CitaMedica({
      paciente: pacienteId,
      medico: medicoId,
      clinica: clinicaId,
      fecha: 'fecha-no-valida',
      hora_inicio: '10:00'
    });

    let error;
    try {
      await cita.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.fecha).toBeDefined();
  });
});
