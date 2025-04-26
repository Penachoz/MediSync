const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Clinica = require('../models/Clinica');

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
  await Clinica.deleteMany({});
});

describe('Modelo Clinica', () => {
  it('debería crear una clínica válida', async () => {
    const clinica = new Clinica({
      nombre: 'Clínica Central',
      direccion: 'Av. Siempre Viva 742',
      ciudad: 'Springfield',
      datos_contacto: {
        telefono: '123456789',
        email: 'contacto@clinicacentral.com'
      }
    });

    const savedClinica = await clinica.save();

    expect(savedClinica._id).toBeDefined();
    expect(savedClinica.nombre).toBe('Clínica Central');
    expect(savedClinica.datos_contacto.telefono).toBe('123456789');
  });

  it('debería fallar si falta el nombre', async () => {
    const clinica = new Clinica({
      direccion: 'Av. Siempre Viva 742',
      ciudad: 'Springfield',
      datos_contacto: {
        telefono: '123456789'
      }
    });

    let error;
    try {
      await clinica.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.nombre).toBeDefined();
  });

  it('debería fallar si falta el teléfono de contacto', async () => {
    const clinica = new Clinica({
      nombre: 'Clínica Sin Teléfono',
      direccion: 'Calle Falsa 123',
      ciudad: 'Shelbyville',
      datos_contacto: {
        // Falta teléfono
        email: 'info@sintelefono.com'
      }
    });

    let error;
    try {
      await clinica.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors['datos_contacto.telefono']).toBeDefined();
  });
});
