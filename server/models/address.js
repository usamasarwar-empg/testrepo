const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
      address.belongsTo(models.country, { foreignKey: 'country_id' });
      address.belongsTo(models.state, { foreignKey: 'state_id' });
    }
  }

  address.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city_name: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    phone: DataTypes.STRING,
    state_name: DataTypes.STRING,
    alternative_phone: DataTypes.STRING,
    company: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    street: DataTypes.STRING,
    building: DataTypes.STRING,
    floor: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'address',
    indexes: [
      {
        fields: ['country_id'],
        name: 'index_spree_addresses_on_country_id',
      },
      {
        fields: ['firstname'],
        name: 'index_addresses_on_firstname',
      },
      {
        fields: ['lastname'],
        name: 'index_addresses_on_lastname',
      },
      {
        fields: ['state_id'],
        name: 'index_spree_addresses_on_state_id',
      }
    ]
  });
  return address;
};
