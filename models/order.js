"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Order.belongsTo(models.Driver, {foreignKey: "driverId"});
            models.Order.belongsTo(models.Customer, {foreignKey: "customerId"});
        }
    }
    Order.init(
        {
            orderId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            customerId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            driverId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            phone: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING,
                default: "접수 대기"
            },
            request: {
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            usageDateTimeStart: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            usageTime: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
