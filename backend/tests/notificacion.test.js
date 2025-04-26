const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Notificacion = require('../models/Notificacion');

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
  await Notificacion.deleteMany({});
});

describe('Modelo Notificacion', () => {
  it('debería guardar una notificación válida', async () => {
    const destinatarioId = new mongoose.Types.ObjectId();

    const notificacion = new Notificacion({
      tipo_destinatario: 'paciente',
      destinatario: destinatarioId,
      contenido: 'Tienes una cita médica mañana.',
      canal: 'app',
      estado: 'pendiente',
      fecha_envio: new Date()
    });

    const saved = await notificacion.save();

    expect(saved._id).toBeDefined();
    expect(saved.tipo_destinatario).toBe('paciente');
    expect(saved.canal).toBe('app');
    expect(saved.estado).toBe('pendiente');
  });

  it('debería fallar si no se proporciona el contenido', async () => {
    const destinatarioId = new mongoose.Types.ObjectId();

    const notificacion = new Notificacion({
      tipo_destinatario: 'medico',
      destinatario: destinatarioId
    });

    let error;
    try {
      await notificacion.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.contenido).toBeDefined();
  });

  it('debería establecer valores predeterminados para canal y estado', async () => {
    const destinatarioId = new mongoose.Types.ObjectId();

    const notificacion = new Notificacion({
      tipo_destinatario: 'admin',
      destinatario: destinatarioId,
      contenido: 'Sistema actualizado exitosamente.'
    });

    const saved = await notificacion.save();

    expect(saved.canal).toBe('app');
    expect(saved.estado).toBe('pendiente');
  });

  it('debería rechazar un tipo de destinatario inválido', async () => {
    const notificacion = new Notificacion({
      tipo_destinatario: 'usuario',
      destinatario: new mongoose.Types.ObjectId(),
      contenido: 'Mensaje de prueba'
    });

    let error;
    try {
      await notificacion.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.tipo_destinatario).toBeDefined();
  });
});
