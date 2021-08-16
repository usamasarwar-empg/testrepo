process.env.NODE_ENV = 'test';

const request = require('supertest');

const App = require('../../app');
const { user1, country1, state1 } = require('./globals');

let app = {};

describe('Run CSC tests', () => {
  let jwtTokenUser1 = '';

  beforeAll(async () => {
    app = await App();
    const response = await request(app).post('/authentication/login')
      .send({
        email: user1.email,
        password: user1.password
      });
    jwtTokenUser1 = response.body.jwtToken;
  });

  // GET all countries
  describe('GET countries', () => {
    it('should return all coutries', async () => {
      const response = await request(app).get('/csc/countries')
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json');
      expect(response.body).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });

  // GET States by country_id
  describe('GET states/country_id', () => {
    it('should return all states given country_id', async () => {
      const response = await request(app).get(`/csc/states/${country1.id}`)
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json');
      expect(response.body).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });

  // GET Cities by country_id and state_id
  describe('GET cities/country_id/state_id', () => {
    it('should return all cities given country_id and state_id', async () => {
      const response = await request(app).get(`/csc/cities/${country1.id}/${state1.id}`)
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json');
      expect(response.body).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });
});
