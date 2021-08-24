module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .createTable('countries', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      name: {
        type: Sequelize.STRING
      },
      phonecode: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

  down: async (queryInterface) => queryInterface.dropTable('countries'),
};
