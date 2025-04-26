const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Paciente = require('../models/Paciente');

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
  await Paciente.deleteMany({});
});

describe('Modelo Paciente', () => {
  it('debería guardar un paciente válido', async () => {
    const paciente = new Paciente({
      nombre: 'Ana',
      apellido: 'Gómez',
      fecha_nacimiento: new Date('1990-05-20'),
      genero: 'femenino',
      datos_contacto: {
        email: 'ana.gomez@example.com',
        telefono: '555123456',
        direccion: 'Calle Falsa 123'
      },
      usuario: new mongoose.Types.ObjectId()
    });

    const saved = await paciente.save();

    expect(saved._id).toBeDefined();
    expect(saved.nombre).toBe('Ana');
    expect(saved.genero).toBe('femenino');
    expect(saved.datos_contacto.email).toBe('ana.gomez@example.com');
  });

  it('debería fallar si no tiene nombre o apellido', async () => {
    const paciente = new Paciente({
      fecha_nacimiento: new Date('2000-01-01'),
      datos_contacto: {
        email: 'sin.nombre@example.com'
      }
    });

    let error;
    try {
      await paciente.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.nombre).toBeDefined();
    expect(error.errors.apellido).toBeDefined();
  });

  it('debería aceptar valores de género válidos solamente', async () => {
    const paciente = new Paciente({
      nombre: 'Alex',
      apellido: 'Pérez',
      fecha_nacimiento: new Date('1985-10-10'),
      genero: 'desconocido',
      datos_contacto: {
        email: 'alex@example.com'
      }
    });

    let error;
    try {
      await paciente.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.genero).toBeDefined();
  });

  it('debería requerir email en datos_contacto', async () => {
    const paciente = new Paciente({
      nombre: 'Luis',
      apellido: 'Martínez',
      fecha_nacimiento: new Date('1992-04-15'),
      datos_contacto: {
        telefono: '555987654',
        direccion: 'Carrera 45 #23-10'
      }
    });

    let error;
    try {
      await paciente.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors['datos_contacto.email']).toBeDefined();
  });
});
