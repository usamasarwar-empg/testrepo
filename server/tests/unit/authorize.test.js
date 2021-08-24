// test of authorize middleware
process.env.NODE_ENV = 'test';

const request = require('supertest');
const bcrypt = require('bcrypt');

const { user } = require('../../models');
const authorize = require('../../middleware/authorize');

const App = require('../../app');

let app = {};
let jwtToken = '';
let mockRequest = {
  header: jest.fn()
};

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
};
const mockNext = jest.fn();

describe('Run Authorize middleware tests', () => {
  beforeAll(async () => {
    app = await App();

    // Register and login a user

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
        email: 'usertest@email.com',
        password: 'usertest'
      });
    jwtToken = await response.body.jwtToken;
  });

  afterAll(async () => {
    await user.destroy({ where: { email: 'usertest@email.com' } });
  });

  it('should return 403 status if there is no token', async () => {
    authorize(mockRequest, mockResponse, mockNext);
    const arg = { msg: 'authorization denied' };
    expect(mockResponse.json).toHaveBeenCalledWith(arg);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
  });

  it('should verify token and call next', () => {
    mockRequest = {
      header: jest.fn().mockReturnValueOnce(jwtToken)
    };
    authorize(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 401 status if INVALID token', () => {
    mockRequest = {
      header: jest.fn().mockReturnValueOnce('fake-token')
    };
    const arg = { msg: 'Token is not valid' };
    authorize(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith(arg);
  });
});
