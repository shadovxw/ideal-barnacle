'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_details", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      amount: { type: Sequelize.STRING },
      donation_type: { type: Sequelize.STRING },
      newsletter: { type: Sequelize.BOOLEAN },
      events_update: { type: Sequelize.BOOLEAN },
      donation_made: { type: Sequelize.STRING },
      details: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.fn("NOW") }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_details");
  }
};
