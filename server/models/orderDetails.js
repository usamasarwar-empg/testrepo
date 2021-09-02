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
    order_id: DataTypes.INTEGER,
    lineitem_id: DataTypes.INTEGER,
    order_deliver_date: DataTypes.DATE,
    IMEI_1: DataTypes.STRING(15),
    IMEI_2: DataTypes.STRING(15),
    serial_number: DataTypes.STRING,
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'orderDetails',
  });
  return orderDetails;
};
