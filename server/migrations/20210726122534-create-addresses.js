module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      address1: {
        type: Sequelize.STRING
      },
      address2: {
        type: Sequelize.STRING
      },
      city_name: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      state_name: {
        type: Sequelize.STRING
      },
      alternative_phone: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      state_id: {
        type: Sequelize.STRING,
        references: {
          model: 'states',
          key: 'id'
        }
      },
      country_id: {
        type: Sequelize.STRING,
        references: {
          model: 'countries',
          key: 'id'
        }
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      street: {
        type: Sequelize.STRING
      },
      building: {
        type: Sequelize.STRING
      },
      floor: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('addresses', ['country_id'], {
      name: 'index_spree_addresses_on_country_id'
    }))
    .then(() => queryInterface.addIndex('addresses', ['firstname'], {
      name: 'index_addresses_on_firstname'
    }))
    .then(() => queryInterface.addIndex('addresses', ['lastname'], {
      name: 'index_addresses_on_lastname'
    }))
    .then(() => queryInterface.addIndex('addresses', ['state_id'], {
      name: 'index_spree_addresses_on_state_id'
    })),

  down: async (queryInterface) => queryInterface.dropTable('addresses'),
};
