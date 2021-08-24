const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
    static associate(models) {
      // define association here
      country.hasMany(models.state, {
        foreignKey: {
          name: 'country_id',
          allowNull: false
        }
      });

      country.hasMany(models.city, {
        foreignKey: {
          name: 'country_id',
          allowNull: false
        }
      });
    }
  }
  country.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },

    name: DataTypes.STRING,
    phonecode: DataTypes.STRING,
    currency: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

  }, {
    sequelize,
    modelName: 'country',
  });
  return country;
};
