'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    static associate(models) {
      UserDetail.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  
  UserDetail.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    donation_type: {
      type: DataTypes.ENUM('food', 'cloths', 'electronics', 'money'),
      allowNull: true
    },
    donation_details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    events_update: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  
  return UserDetail;
};