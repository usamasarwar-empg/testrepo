const bcrypt = require('bcrypt');

const adminUsers = [...Array(1)].map(() => (
  {
    id: 1000,
    firstname: 'Phantom',
    lastname: 'Admin',
    email: 'phantom_admin@email.com',
    password: bcrypt.hashSync('phantom', 10),
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
    queryInterface.bulkInsert('users', adminUsers, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('users', { name: 'Phantom Admin' });
  }

};
