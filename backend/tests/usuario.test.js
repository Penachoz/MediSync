require('dotenv').config();

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MONGO_TEST_URI = 'mongodb+srv://Admin:p1UpgNf4nEZgTkxl@cinecine.posuu.mongodb.net/test';

beforeAll(async () => {
  await mongoose.connect(MONGO_TEST_URI);
});


afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
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
      username: 'invalidemail',
      password: '123453',
      tipo_usuario: 'paciente',
    };

    const res = await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('Por favor ingresa un correo electrónico válido.');
  });

  it('debería mostrar un error si la contraseña es demasiado corta', async () => {
    const userData = {
      username: 'test@validemail.com',
      password: '123',
      tipo_usuario: 'paciente',
    };

    const res = await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('La contraseña debe tener al menos 6 caracteres.');
  });

  it('debería mostrar un error si el usuario ya existe', async () => {
    const userData = {
      username: `duplicado${Date.now()}@test.com`,
      password: '123453',
      tipo_usuario: 'paciente',
    };

    await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    const res = await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('El correo electrónico ya está registrado.');
  });

  it('debería manejar errores del servidor (simulado)', async () => {
    const originalFindOne = Usuario.findOne;
    Usuario.findOne = jest.fn().mockRejectedValue(new Error('Fallo simulado'));

    const userData = {
      username: `error${Date.now()}@test.com`,
      password: '123453',
      tipo_usuario: 'paciente',
    };

    const res = await request(app)
      .post('/api/usuarios/register')
      .send(userData);

    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toBe('Error al registrar usuario');

    Usuario.findOne = originalFindOne;
  });
});

describe('POST /api/usuarios/login', () => {
  let testUser;

  beforeAll(async () => {
    testUser = new Usuario({
      username: `login${Date.now()}@test.com`,
      password_hash: await bcrypt.hash('validPassword', 10),
      tipo_usuario: 'paciente',
      estado: 'activo',
      ultimo_access: new Date('2025-01-01T00:00:00Z'),
    });
    await testUser.save();
  });

  it('debería hacer login exitoso con credenciales correctas', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({ username: testUser.username, password: 'validPassword' });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Login exitoso');
    expect(res.body.token).toBeDefined();
  });

  it('debería fallar si falta el username', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({ password: 'cualquierPassword' });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('El correo y la contraseña son obligatorios.');
  });

  it('debería fallar si falta la contraseña', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({ username: testUser.username });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('El correo y la contraseña son obligatorios.');
  });

  it('debería fallar si el usuario no existe', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({ username: 'noexiste@test.com', password: 'password123' });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Usuario no encontrado');
  });

  it('debería fallar si la contraseña es incorrecta', async () => {
    const res = await request(app)
      .post('/api/usuarios/login')
      .send({ username: testUser.username, password: 'passwordIncorrecto' });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe('Contraseña incorrecta');
  });

  it('debería manejar errores del servidor (simulado)', async () => {
    const originalFindOne = Usuario.findOne;
    Usuario.findOne = jest.fn().mockRejectedValue(new Error('Error simulado'));

    const res = await request(app)
      .post('/api/usuarios/login')
      .send({ username: testUser.username, password: 'validPassword' });

    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toBe('Error en el login');

    Usuario.findOne = originalFindOne;
  });
});

describe('Acceso Secreto', () => {
  it('debería identificar acceso secreto si el usuario es el correo secreto', async () => {
    const secretUser = new Usuario({
      username: 'admin@secreto.com',
      password_hash: await bcrypt.hash('123456', 10),
      tipo_usuario: 'admin',
      estado: 'activo',
      ultimo_access: new Date('2025-01-01T00:00:00Z'),
    });
    await secretUser.save();

    const res = await request(app)
      .post('/api/usuarios/login')
      .send({ username: 'admin@secreto.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Login exitoso');
    expect(res.body.token).toBeDefined();

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
    expect(decoded.accesoSecreto).toBe(true);
  });
});
