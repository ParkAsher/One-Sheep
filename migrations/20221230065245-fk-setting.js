'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        // reviews - driverId
        await queryInterface.addConstraint('Reviews', {
            fields: ['driverId'],
            type: 'foreign key',
            name: 'Drivers_Reviews_id_fk',
            references: {
                table: 'Drivers',
                field: 'driverId',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        // reviews - customerId
        await queryInterface.addConstraint('Reviews', {
            fields: ['customerId'],
            type: 'foreign key',
            name: 'Customers_Reviews_id_fk',
            references: {
                table: 'Customers',
                field: 'customerId',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        // orders - driverId
        await queryInterface.addConstraint('Orders', {
            fields: ['driverId'],
            type: 'foreign key',
            name: 'Drivers_Orders_id_fk',
            references: {
                table: 'Drivers',
                field: 'driverId',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        // orders - customerId
        await queryInterface.addConstraint('Orders', {
            fields: ['customerId'],
            type: 'foreign key',
            name: 'Customers_Orders_id_fk',
            references: {
                table: 'Customers',
                field: 'customerId',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeConstraint('Reviews', 'Drivers_Reviews_id_fk');
        await queryInterface.removeConstraint('Reviews', 'Customers_Reviews_id_fk');
        await queryInterface.removeConstraint('Orders', 'Drivers_Orders_id_fk');
        await queryInterface.removeConstraint('Orders', 'Customers_Orders_id_fk');
    },
};
