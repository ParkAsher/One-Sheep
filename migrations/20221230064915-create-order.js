'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            orderId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            customerId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            driverId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            phone: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            request: {
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            usageDateTimeStart: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            usageTime: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    },
};
