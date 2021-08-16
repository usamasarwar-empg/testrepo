const address = [
  {
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
    createdAt: new Date(),
    updatedAt: new Date(),
    latitude: 2.3,
    longitude: 4.56,
    street: 'test street',
    building: 'test building',
    floor: 'test floor'
  }
];
module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('addresses', address, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('addresses', null, {});
  }
};
