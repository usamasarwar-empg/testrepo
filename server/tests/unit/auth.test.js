process.env.NODE_ENV = 'test';

const request = require('supertest');
const bcrypt = require('bcrypt');

const { user } = require('../../models');
const App = require('../../app');
const { user1 } = require('./globals');

let app = {};

describe('Run autheintication tests', () => {
  let jwtTokenUser1 = '';

  beforeAll(async () => {
    app = await App();
    const email = 'usertest@email.com';
    const firstname = 'user';
    const lastname = 'test';
    const password = 'usertest';
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    await user.findOrCreate({
      defaults: {
        firstname,
        lastname,
        password: bcryptPassword,
      },
      where: {
        email,
      },
    });
    const response = await request(app).post('/authentication/login')
      .send({
        email: user1.email,
        password: user1.password
      });
    jwtTokenUser1 = response.body.jwtToken;
  });

  afterAll(async () => {
    await user.destroy({ where: { email: 'usertest@email.com' } });
  });

  describe('Login user', () => {
    it('should login a user and return status 200', async () => {
      const response = await request(app).post('/authentication/login')
        .send({
          email: 'usertest@email.com',
          password: 'usertest'
        });
      await expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      // await expect(response.body.jwtToken).toBeDefined();
      await expect(response.statusCode).toBe(200);
    });

    it('should NOT login a user with invalid credentials', async () => {
      await request(app).post('/authentication/login')
        .send({
          email: 'usertest@email.com',
          password: 'wrongPass'
        })
        .expect('Content-Type', /json/)
        .expect(401);

      await request(app).post('/authentication/login')
        .send({
          email: 'wrongEmail@email.com',
          password: 'usertest'
        })
        .expect('Content-Type', /json/)
        .expect(401);
    });
  });

  describe('Registering user', () => {
    afterAll(async () => {
      await user.destroy({ where: { email: 'newusertest@email.com' } });
      await user.destroy({ where: { email: 'newusertest2@email.com' } });
      await user.destroy({ where: { email: 'newuserJWT@email.com' } });
    });

    it('should register a user POST /authentication/regiester', async () => {
      await request(app).post('/authentication/register')
        .send({
          email: 'newusertest@email.com',
          firstname: 'new',
          lastname: 'user1',
          password: 'test123'
        })
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should register a user and contain JSON Web Token in response body', async () => {
      const response = await request(app).post('/authentication/register')
        .send({
          email: 'newuserJWT@email.com',
          firstname: 'new',
          lastname: 'user',
          password: 'test123'
        });
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body.jwtToken).toBeDefined();
    });

    it('should NOT register an already registered user', async () => {
      await request(app).post('/authentication/register')
        .send({
          email: 'newusertest2@email.com',
          firstname: 'new',
          lastname: 'user2',
          password: 'test123'
        });
      await request(app).post('/authentication/register')
        .send({
          email: 'newusertest2@email.com',
          firstname: 'new',
          lastname: 'user2',
          password: 'test123'
        })
        .expect(401);
    });

    it('should NOT register a user with missing parameters', async () => {
      await request(app).post('/authentication/register')
        .send({
          firstname: 'new',
          lastname: 'user3',
          password: 'test123'
        })
        .expect(401);
      await request(app).post('/authentication/register')
        .send({
          email: 'newuser3@email.com',
          lastname: 'user3',
          password: 'test123'
        })
        .expect(401);
      await request(app).post('/authentication/register')
        .send({
          email: 'newuser3@email.com',
          firstname: 'new',
          password: 'test123'
        })
        .expect(401);
      await request(app).post('/authentication/register')
        .send({
          email: 'newuser3@email.com',
          firstname: 'new',
          lastname: 'user3'
        })
        .expect(401);
    });
    it('should NOT register a user with invalid email', async () => {
      await request(app).post('/authentication/register')
        .send({
          email: 'newuser4.com',
          firstname: 'new',
          lastname: 'user4',
          password: 'test123'
        })
        .expect(401);
    });
  });

  describe('Verify User', () => {
    it('should verify user and return true', async () => {
      const response = await request(app).post('/authentication/verify')
        .set('jwt_token', jwtTokenUser1);
      expect(response).toBeTruthy();
    });
  });
});
