import request from 'supertest';
import app from '../app.js'; // importa tu aplicación Express
import adoptionsController from '../controllers/adoptions.controller.js';

describe('GET /adoptions', () => {
  it('debería devolver todas las adopciones', async () => {
    const response = await request(app).get('/adoptions');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /adoptions/:aid', () => {
  it('debería devolver una adopción específica', async () => {
    const aid = 'algún-id-válido';
    const response = await request(app).get(`/adoptions/${aid}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('aid', aid);
  });

  it('debería devolver 404 si la adopción no existe', async () => {
    const aid = 'id-no-existente';
    const response = await request(app).get(`/adoptions/${aid}`);
    expect(response.status).toBe(404);
  });
});

describe('POST /adoptions/:uid/:pid', () => {
  it('debería crear una nueva adopción', async () => {
    const uid = 'algún-uid-válido';
    const pid = 'algún-pid-válido';
    const response = await request(app).post(`/adoptions/${uid}/${pid}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('aid');
  });

  it('debería devolver 400 si los parámetros son inválidos', async () => {
    const uid = '';
    const pid = '';
    const response = await request(app).post(`/adoptions/${uid}/${pid}`);
    expect(response.status).toBe(400);
  });
});