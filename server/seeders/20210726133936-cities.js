const { City } = require('country-state-city');

let cities = City.getCitiesOfCountry('PK')
  .concat(City.getCitiesOfCountry('CA'))
  .concat(City.getCitiesOfCountry('AF'));

cities = cities.map((city) => (
  {
    name: city.name,
    country_id: city.countryCode,
    state_id: city.stateCode,
    latitude: city.latitude,
    longitude: city.longitude,
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
    await queryInterface.bulkInsert('cities', cities, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('cities', null, {});
  }
};
