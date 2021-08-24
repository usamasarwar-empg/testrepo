process.env.NODE_ENV = 'test';

const request = require('supertest');

const App = require('../../app');

let app = {};

describe('Run Dashboard tests', () => {
  let jwtToken = '';
  const email = 'phantom_testuser@email.com';

  beforeAll(async () => {
    app = await App();
    const response = await request(app).post('/authentication/login')
      .send({
        email,
        password: 'phantom'
      });
    jwtToken = await response.body.jwtToken;
  });

  it('should return authorized user', async () => {
    const response = await request(app).get('/dashboard/')
      .set('jwt_token', jwtToken);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body[0].email).toEqual(email);
  });
});
