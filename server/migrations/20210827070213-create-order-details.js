module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lineitem_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      order_deliver_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      IMEI_1: {
        type: Sequelize.STRING
      },
      IMEI_2: {
        type: Sequelize.STRING
      },
      serial_number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('orderDetails');
  }
};
