const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class state extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      // define association here
    //   state.belongsTo(models.country, {
    //     foreignKey: {
    //       name: 'country_id',
    //       allowNull: false
    //     }
    //   });

      state.hasMany(models.city, {
        foreignKey: {
          name: 'state_id',
          allowNull: false
        }
      });
    }
  }
  state.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },

    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,

  }, {
    sequelize,
    modelName: 'state',
  });
  return state;
};
