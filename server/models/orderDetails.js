const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class orderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  orderDetails.init({
    order_id: DataTypes.STRING,
    lineitem_id: DataTypes.STRING,
    order_deliver_date: DataTypes.DATE,
    IMEI_1: DataTypes.STRING,
    IMEI_2: DataTypes.STRING,
    serial_number: DataTypes.INTEGER,
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'orderDetails',
  });
  return orderDetails;
};
