const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
    static associate() {
      // define association here
    //   city.belongsTo(models.country, {
    //     foreignKey: {
    //       name: 'country_id',
    //       allowNull: false
    //     }
    //   });
    //   city.belongsTo(models.state, {
    //     foreignKey: {
    //       name: 'state_id',
    //       allowNull: false
    //     }
    //   });
    }
  }
  city.init({

    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

  }, {
    sequelize,
    modelName: 'city',
  });
  return city;
};
