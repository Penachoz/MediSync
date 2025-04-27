const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Medico = require('../models/Medico');

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
  await Medico.deleteMany({});
});

describe('Modelo Medico', () => {
  it('debería crear un médico válido', async () => {
    const medico = new Medico({
      nombre: 'Ana',
      apellido: 'Gómez',
      especialidad: 'Cardiología',
      licencia_medica: 'LIC123456',
      datos_contacto: {
        email: 'ana.gomez@hospital.com',
        telefono: '321654987',
        direccion: 'Calle 45 #12-34'
      },
      usuario: new mongoose.Types.ObjectId()
    });

    const savedMedico = await medico.save();

    expect(savedMedico._id).toBeDefined();
    expect(savedMedico.nombre).toBe('Ana');
    expect(savedMedico.datos_contacto.email).toBe('ana.gomez@hospital.com');
  });

  it('debería fallar si falta la especialidad', async () => {
    const medico = new Medico({
      nombre: 'Luis',
      apellido: 'Pérez',
      licencia_medica: 'LIC654321',
      datos_contacto: {
        email: 'luis.perez@hospital.com'
      }
    });

    let error;
    try {
      await medico.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.especialidad).toBeDefined();
  });

  it('debería fallar si la licencia médica no es única', async () => {
    const licencia = 'LIC999999';
    const medico1 = new Medico({
      nombre: 'Claudia',
      apellido: 'Ruiz',
      especialidad: 'Pediatría',
      licencia_medica: licencia,
      datos_contacto: {
        email: 'claudia.ruiz@hospital.com'
      }
    });

    const medico2 = new Medico({
      nombre: 'Fernando',
      apellido: 'Lopez',
      especialidad: 'Neurología',
      licencia_medica: licencia,
      datos_contacto: {
        email: 'fernando.lopez@hospital.com'
      }
    });

    await medico1.save();
    let error;
    try {
      await medico2.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000);
  });

  it('debería fallar si falta el correo electrónico de contacto', async () => {
    const medico = new Medico({
      nombre: 'Laura',
      apellido: 'Santos',
      especialidad: 'Dermatología',
      licencia_medica: 'LIC777777',
      datos_contacto: {
        telefono: '3124567890',
        direccion: 'Av. Central 123'
      }
    });

    let error;
    try {
      await medico.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors['datos_contacto.email']).toBeDefined();
  });

  it('debería almacenar timestamps automáticamente', async () => {
    const medico = new Medico({
      nombre: 'Miguel',
      apellido: 'Torres',
      especialidad: 'Ginecología',
      licencia_medica: 'LIC888888',
      datos_contacto: {
        email: 'miguel.torres@hospital.com'
      }
    });

    const savedMedico = await medico.save();

    expect(savedMedico.createdAt).toBeDefined();
    expect(savedMedico.updatedAt).toBeDefined();
  });
});
