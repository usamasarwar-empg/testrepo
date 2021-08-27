const user1 = {
  id: 100,
  firstname: 'Test',
  lastname: 'User',
  email: 'phantom_testuser@email.com',
  password: 'phantom'
};

const user2 = {
  id: 200,
  firstname: 'Test',
  lastname: 'User2',
  email: 'phantom_testuser2@email.com',
  password: 'phantom'
};

const user2Address = {
  user_id: 200,
  firstname: 'Test',
  lastname: 'User2',
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
};

const country1 = {
  id: 'PK',
  name: 'Pakistan',
  phonecode: '92',
  currency: 'PKR',
  latitude: 30,
  longitude: 70
};

const state1 = {
  name: 'Punjab',
  id: 'PB',
  country_id: 'PK',
  latitude: 31.1471305,
  longitude: 75.3412179
};

const orderDetailsTest = {
  order_id: '123test',
  lineitem_id: '123test',
  order_deliver_date: new Date(),
  IMEI_1: 'imei123test',
  IMEI_2: 'imei123test',
  serial_number: 111,
  order_date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

const orderDetails1 = {
  order_id: '1',
  lineitem_id: '2',
  order_deliver_date: new Date(),
  IMEI_1: 'random_imei_1',
  IMEI_2: 'random_imei_1',
  serial_number: 777,
  order_date: new Date(),
};

module.exports = {
  user1, user2, user2Address, country1, state1, orderDetailsTest, orderDetails1
};
