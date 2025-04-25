const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Usuario = require('../models/Usuario');

const MONGO_TEST_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medisync_test';

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI); // Conexión sin opciones deprecated
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); // Limpia la base de datos de prueba
  await mongoose.disconnect();
});

describe('POST /api/usuarios/register', () => {
  it('debería registrar un nuevo usuario cuando los datos son válidos', async () => {
    const userData = {
      username: `test${Date.now()}@test.com`,
      password: '123453',
      tipo_usuario: 'paciente',
    };

    const res = await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe('Usuario registrado correctamente');

    const userInDb = await Usuario.findOne({ username: userData.username });
    expect(userInDb).not.toBeNull();
    expect(userInDb.tipo_usuario).toBe('paciente');
  }, 10000);

  it('debería mostrar un error si el correo no es válido', async () => {
    const userData = {
      username: 'invalidemail', // Correo inválido
      password: '123453',
      tipo_usuario: 'paciente',
    };

    const res = await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    expect(res.statusCode).toBe(400); // Suponiendo que se devuelven 400 para entradas incorrectas
    expect(res.body.msg).toBe('Por favor ingresa un correo electrónico válido.');
  });

  it('debería mostrar un error si la contraseña es demasiado corta', async () => {
    const userData = {
      username: 'test@validemail.com',
      password: '123', // Contraseña demasiado corta
      tipo_usuario: 'paciente',
    };

    const res = await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    expect(res.statusCode).toBe(400); // Suponiendo que se devuelven 400 para entradas incorrectas
    expect(res.body.msg).toBe('La contraseña debe tener al menos 6 caracteres.');
  });
});
