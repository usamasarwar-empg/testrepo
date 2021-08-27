process.env.NODE_ENV = 'test';

const request = require('supertest');

const App = require('../../app');
const { orderDetails } = require('../../models');
// const { orderDetails } = require('../../models');
const { user1, orderDetailsTest, orderDetails1 } = require('./globals');

let app = {};

describe('Run Order Details tests', () => {
  let jwtTokenUser1 = '';

  // login user1
  beforeAll(async () => {
    app = await App();
    const response1 = await request(app).post('/authentication/login')
      .send({
        email: user1.email,
        password: user1.password
      });
    console.log(response1.body);
    jwtTokenUser1 = response1.body.jwtToken;
    console.log(jwtTokenUser1);
  });

  // GET orderDetails test
  describe('GET orderDetails', () => {
    it('should return all orderDetails from DB', async () => {
      const response = await request(app).get('/orderdetails/')
        .set('jwt_token', jwtTokenUser1);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  //  POST orderDetails test
  describe('POST orderDetails', () => {
    afterAll(async () => {
      await orderDetails.destroy({ where: { order_id: orderDetails1.order_id } });
    });

    it('should add orderDetails to DB', async () => {
      const response = await request(app).post('/orderdetails/')
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json')
        .send(orderDetails1);
      console.log(response.body);
      expect(response.body.order_id).toBe(orderDetails1.order_id);
      expect(response.status).toBe(200);
    });
  });

  //  PUT orderDetails test
  describe('PUT orderDetails', () => {
    // update back to original values
    afterAll(async () => {
      await orderDetails.update(orderDetailsTest,
        { where: { order_id: orderDetailsTest.order_id } });
    });

    // update orderDetails (having order_id:'123test') values
    it('should update IMEI of orderDetails having order_id: 123test', async () => {
      const updatedOrderDetails = { ...orderDetailsTest };
      updatedOrderDetails.IMEI_1 = 'imei1_updated';
      console.log('UPDATED ORDER DETAILS');
      console.log(updatedOrderDetails);
      console.log(orderDetailsTest);

      const response = await request(app).put(`/orderdetails/${orderDetailsTest.order_id}`)
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json')
        .send(updatedOrderDetails);
      console.log(response.body);
      expect(response.body[0]).toBe(1);
      expect(response.statusCode).toBe(200);

      const orderDetailsResult = await orderDetails.findAll({
        where: {
          order_id: orderDetailsTest.order_id
        }
      });
      console.log(orderDetailsResult[0].IMEI_1);
      expect(orderDetailsResult[0].IMEI_1).toBe('imei1_updated');
    });

    // if orderDetails not found
    it('should return status 400 if not updated', async () => {
      const response = await request(app).put('/orderdetails/random_order_id02342341')
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json')
        .send(orderDetails1);
      expect(response.body[0]).toBe(0);
      expect(response.statusCode).toBe(400);
    });
  });

  // DELETE orderDetails
  describe('DELETE orderDetails', () => {
    // delete orderDetails
    it('should delete orderDetails with order_id: 123test', async () => {
      const response = await request(app).del(`/orderdetails/${orderDetailsTest.order_id}`)
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json');
      console.log(response.body);
      expect(response.body).toBe(1);
    });

    // if orderDetails not found
    it('should return 400 status if orderDetails not found', async () => {
      const response = await request(app).del('/orderdetails/random_order_id0020213')
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json');
      expect(response.body).toBe(0);
      expect(response.statusCode).toBe(400);
    });
  });
});
