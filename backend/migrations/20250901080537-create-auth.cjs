'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("auth", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      token: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("auth");
  }
};
