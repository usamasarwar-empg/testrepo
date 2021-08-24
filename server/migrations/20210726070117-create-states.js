module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .createTable('states', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      country_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id'
        }
      },
      name: {
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

  down: async (queryInterface) => queryInterface.dropTable('states'),
};
