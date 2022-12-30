'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Review.belongsTo(models.Customer, { foreignKey: 'customerId' });
            models.Review.belongsTo(models.Driver, { foreignKey: 'driverId' });
        }
    }
    Review.init(
        {
            reviewId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            driverId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            customerId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            stars: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
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
            modelName: 'Review',
        }
    );
    return Review;
};
