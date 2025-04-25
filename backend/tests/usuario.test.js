const request = require('supertest');
const app = require('../app');

describe('POST /api/usuarios/register', () => {
  it('debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/usuarios/register')
      .send({
        username: `test${Date.now()}@test.com`,
        password: '123456',
        tipo_usuario: 'paciente'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe('Usuario registrado correctamente');
  });
});
