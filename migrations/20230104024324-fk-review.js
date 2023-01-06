'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // reviews - orderId
    await queryInterface.addConstraint('Reviews', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'Orders_Reviews_id_fk',
        references: {
            table: 'Orders',
            field: 'orderId',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Reviews', 'Orders_Reviews_id_fk');
  }
};
