// const faker = require('faker');

// const address = [...Array(10)].map(() => (
//   {
//     user_id: 1,
//     firstname: faker.name.firstName(),
//     lastname: faker.name.lastName(),
//     address1: faker.address.streetAddress(),
//     address2: faker.address.streetAddress(),
//     city_name: faker.address.city(),
//     zipcode: faker.address.zipCode(),
//     phone: faker.phone.phoneNumber(),
//     state_name: faker.address.country(),
//     alternative_phone: faker.phone.phoneNumber(),
//     company: faker.company.companyName(),
//     state_id: 132,
//     country_id: 123,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     latitude: 2.3,
//     longitude: 4.56,
//     street: faker.address.streetName(),
//     building: 'building',
//     floor: 'floor'
//   }
// ));
module.exports = {
  up: async () => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //  await queryInterface.bulkInsert('addresses', address, {});
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
