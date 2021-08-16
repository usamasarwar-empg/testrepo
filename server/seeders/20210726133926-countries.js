const { Country } = require('country-state-city');

let countries = [];
countries.push(Country.getCountryByCode('PK'));
countries.push(Country.getCountryByCode('CA'));
countries.push(Country.getCountryByCode('AF'));

countries = countries.map((country) => (
  {
    id: country.isoCode,
    name: country.name,
    phonecode: country.phonecode,
    currency: country.currency,
    latitude: country.latitude,
    longitude: country.longitude,
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
    await queryInterface.bulkInsert('countries', countries, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('countries', null, {});
  }
};
