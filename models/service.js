'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    customerId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    request: DataTypes.STRING,
    status: DataTypes.STRING,
    usageDateTimeStart: DataTypes.DATE,
    usageTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};