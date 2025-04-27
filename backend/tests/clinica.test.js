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

  it('debería permitir guardar una clínica sin email de contacto', async () => {
    const clinica = new Clinica({
      nombre: 'Clínica sin Email',
      direccion: 'Calle Real 456',
      ciudad: 'Capital City',
      datos_contacto: {
        telefono: '987654321'
      }
    });

    const savedClinica = await clinica.save();

    expect(savedClinica._id).toBeDefined();
    expect(savedClinica.datos_contacto.email).toBeUndefined();
  });

  it('debería fallar si falta la dirección', async () => {
    const clinica = new Clinica({
      nombre: 'Clínica sin Dirección',
      ciudad: 'Ogdenville',
      datos_contacto: {
        telefono: '5551234'
      }
    });

    let error;
    try {
      await clinica.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.direccion).toBeDefined();
  });

  it('debería fallar si falta la ciudad', async () => {
    const clinica = new Clinica({
      nombre: 'Clínica sin Ciudad',
      direccion: 'Calle Principal 101',
      datos_contacto: {
        telefono: '5555678'
      }
    });

    let error;
    try {
      await clinica.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.ciudad).toBeDefined();
  });

  it('debería almacenar timestamps automáticamente', async () => {
    const clinica = new Clinica({
      nombre: 'Clínica Timestamps',
      direccion: 'Calle Temporal 12',
      ciudad: 'Timeville',
      datos_contacto: {
        telefono: '321654987'
      }
    });

    const savedClinica = await clinica.save();

    expect(savedClinica.createdAt).toBeDefined();
    expect(savedClinica.updatedAt).toBeDefined();
  });
});
