process.env.NODE_ENV = 'test';

const request = require('supertest');

const App = require('../../app');
const { address } = require('../../models');
const { user1, user2, user2Address } = require('./globals');

let app = {};

// user1 has id 100
// user2 has id 200
// user1 has no address
// user2 already has an address

describe('Run Address tests', () => {
  let jwtTokenUser1 = '';
  let jwtTokenUser2 = '';

  // login user1 and user2
  beforeAll(async () => {
    app = await App();
    const response1 = await request(app).post('/authentication/login')
      .send({
        email: user1.email,
        password: user1.password
      });
    console.log(response1.body);
    jwtTokenUser1 = response1.body.jwtToken;
    const response2 = await request(app).post('/authentication/login')
      .send({
        email: user2.email,
        password: user2.password
      });
    jwtTokenUser2 = await response2.body.jwtToken;

    console.log('outer before all');
    console.log(jwtTokenUser1);
  });

  // GET address test of user1 and user2
  describe('GET address', () => {
    it('should return empty array if user Address not found', async () => {
      const response = await request(app).get('/address/')
        .set('jwt_token', jwtTokenUser1);
      console.log(response.body);
      expect(response.body.length).toBe(0);
    });

    it('should return user\'s address', async () => {
      const response = await request(app).get('/address/')
        .set('jwt_token', jwtTokenUser2);
      console.log(response.body);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  // POST address test of user1
  describe('POST address', () => {
    afterAll(async () => {
      await address.destroy({ where: { user_id: user1.id } });
    });

    it('should add address for the user', async () => {
      const response = await request(app).post('/address/')
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json')
        .send({
          firstname: user1.firstname,
          lastname: user1.lastname,
          address1: 'test address 1',
          address2: 'test address 2',
          city_name: 'Lahore',
          zipcode: '123',
          phone: '03213234294',
          state_name: 'Punjab',
          alternative_phone: '0358304535',
          company: 'test Company',
          state_id: 'PB',
          country_id: 'PK',
          latitude: 2.3,
          longitude: 4.56,
          street: 'test street',
          building: 'test building',
          floor: 'test floor'
        });
      console.log(response.body);
      expect(response.body.user_id).toBe(user1.id);
    });
  });

  // PUT address test of user2
  describe('PUT address', () => {
    beforeAll(async () => {
      await address.destroy({ where: { user_id: user1.id } });
    });

    // update back to original values
    afterAll(async () => {
      await address.update(user2Address, { where: { user_id: user2.id } });
    });

    // update user2 address's zipcode
    it('should update zipcode of address', async () => {
      const updatedAddress = user2Address;
      updatedAddress.zipcode = '400123';
      const response = await request(app).put('/address/')
        .set('jwt_token', jwtTokenUser2)
        .set('Content-Type', 'application/json')
        .send(updatedAddress);
      console.log(response.body);
      expect(response.body[0]).toBe(1);
      expect(response.statusCode).toBe(200);
      const addressResult = await address.findAll({
        where: {
          user_id: user2.id
        }
      });
      console.log(addressResult[0].zipcode);
      expect(addressResult[0].zipcode).toBe(updatedAddress.zipcode);
    });

    // updates user2 address's street and building
    it('should update street and builing of address', async () => {
      const updatedAddress = user2Address;
      updatedAddress.street = 'new street';
      updatedAddress.building = 'new building';
      const response = await request(app).put('/address/')
        .set('jwt_token', jwtTokenUser2)
        .set('Content-Type', 'application/json')
        .send(updatedAddress);
      console.log(response.body);
      expect(response.body[0]).toBe(1);
      expect(response.statusCode).toBe(200);
      const addressResult = await address.findAll({
        where: {
          user_id: user2.id
        }
      });
      expect(addressResult[0].street).toBe(updatedAddress.street);
      expect(addressResult[0].building).toBe(updatedAddress.building);
    });

    // tries to update null address of user1
    it('should return 400 status if address not found', async () => {
      const response = await request(app).put('/address/')
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json')
        .send(
          {
            firstname: user1.firstname,
            lastname: user1.lastname,
            address1: 'test address 1',
            address2: 'test address 2',
            city_name: 'Lahore',
            zipcode: '400123',
            phone: '03213234294',
            state_name: 'Punjab',
            alternative_phone: '0358304535',
            company: 'test Company',
            state_id: 'PB',
            country_id: 'PK',
            latitude: 2.3,
            longitude: 4.56,
            street: 'test street',
            building: 'test building',
            floor: 'test floor'
          }
        );
      console.log(response.body);
      expect(response.body[0]).toBe(0);
      expect(response.statusCode).toBe(400);
    });
  });

  // DELETE address of user
  describe('DELETE address', () => {
    // delete address of user2
    it('should delete address of user2', async () => {
      const response = await request(app).del('/address/')
        .set('jwt_token', jwtTokenUser2)
        .set('Content-Type', 'application/json');
      console.log(response.body);
      expect(response.body).toBe(1);
    });

    // tries to delete null address of User1
    it('should return 400 status if address not found', async () => {
      const response = await request(app).del('/address/')
        .set('jwt_token', jwtTokenUser1)
        .set('Content-Type', 'application/json');
      expect(response.body).toBe(0);
      expect(response.statusCode).toBe(400);
    });
  });
});
