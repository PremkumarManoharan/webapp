const request = require('supertest');
import app from '../src/api/v1/index.js';
import server from '../server.js';

describe('Integration Testing', () => {
    
    test('DB Up - Should return a successful response (status code 200)', async () => {
      const response = await request(app).get('/healthz');
      expect(response.statusCode).toBe(200);
    });

    test('POST request to create User', async () => {
        const userData = {
          username: 'newUser@example.com',
          first_name: 'newUser',
          last_name: 'Testing',
          password: 'password123',
        };

        const response = await request(app)
          .post('/v1/user') 
          .set('Accept', 'application/json')
          .send(userData);
    
        expect(response.statusCode).toBe(201);
      });

      test('GET request to verify User exist', async () => {

        const response = await request(app)
          .get('/v1/user/self')
          .auth('newUser@example.com', 'password123')

        expect(response.statusCode).toBe(200);
      });

      test('PUT request to Update User', async () => {
        const userData = {
          first_name: 'newName',
          last_name: 'newLastName'
        };

        const response = await request(app)
          .put('/v1/user/self') 
          .set('Accept', 'application/json')
          .auth('newUser@example.com', 'password123')
          .send(userData);
    
        expect(response.statusCode).toBe(204);
      });

      test('GET request to verify User exist', async () => {

        const response = await request(app)
          .get('/v1/user/self')
          .auth('newUser@example.com', 'password123')

        expect(response.body.first_name).toEqual("newName");
        expect(response.body.last_name).toEqual("newLastName");
      });

      afterAll(done => {
       server.close();
        done();
      })
      
      
});
