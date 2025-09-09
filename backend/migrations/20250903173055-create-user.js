'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      mobile: {
        type: Sequelize.STRING,
        allowNull: true
      },

      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user'
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      verify_otp: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },

      verify_otp_expire_at: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },

      is_account_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      reset_otp: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },

      reset_otp_expire_at: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
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

    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_unique_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
