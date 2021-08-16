const bcrypt = require('bcrypt');

const testUser = [
  {
    id: 100,
    firstname: 'Test',
    lastname: 'User',
    email: 'phantom_testuser@email.com',
    password: bcrypt.hashSync('phantom', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 200,
    firstname: 'Test',
    lastname: 'User2',
    email: 'phantom_testuser2@email.com',
    password: bcrypt.hashSync('phantom', 10),
    createdAt: new Date(),
    updatedAt: new Date()
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
    queryInterface.bulkInsert('users', testUser, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('users', { id: 100 });
    queryInterface.bulkDelete('users', { id: 200 });
  }

};
