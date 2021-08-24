const { State } = require('country-state-city');

let states = State.getStatesOfCountry('PK')
  .concat(State.getStatesOfCountry('CA'))
  .concat(State.getStatesOfCountry('AF'));

states = states.map((state) => (
  {
    name: state.name,
    id: state.isoCode,
    country_id: state.countryCode,
    latitude: state.latitude,
    longitude: state.longitude,
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
    await queryInterface.bulkInsert('states', states, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('states', null, {});
  }
};
