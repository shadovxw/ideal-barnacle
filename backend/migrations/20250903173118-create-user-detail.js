'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // ✅ must match lowercase table name
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },

      donation_type: {
        type: Sequelize.ENUM('food', 'cloths', 'electronics', 'money'),
        allowNull: true
      },

      donation_details: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      newsletter: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      events_update: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    await queryInterface.addIndex('user_details', ['user_id'], {
      name: 'user_details_user_id_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_details');
  }
};
