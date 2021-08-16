module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .createTable('cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id'
        }
      },
      state_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'states',
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

  down: async (queryInterface) => queryInterface.dropTable('cities'),
};
