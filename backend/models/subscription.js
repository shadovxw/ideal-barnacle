'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  
  Subscription.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    emailid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  
  return Subscription;
};