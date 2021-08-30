const orderDetails = [
  {
    order_id: 123,
    lineitem_id: 123,
    order_deliver_date: new Date(),
    IMEI_1: 'imei123test',
    IMEI_2: 'imei123test',
    serial_number: 'sn111',
    order_date: new Date(),
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
    await queryInterface.bulkInsert('orderDetails', orderDetails, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('orderDetails', null, {});
  }
};
