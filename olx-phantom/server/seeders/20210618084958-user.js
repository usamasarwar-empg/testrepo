const faker = require('faker');
const bcrypt = require('bcrypt');

const users = [...Array(1)].map(() => (
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

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
    queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('users', null, {});
  }

};
