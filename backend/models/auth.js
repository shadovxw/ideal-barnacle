'use strict';

module.exports = (sequelize, DataTypes) => {
  const Auth = sequelize.define('Auth', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    token: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'Auths',
    timestamps: true,          // manages created_at, updated_at
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Auth.associate = function(models) {
    if (models.User) {
      Auth.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  };

  return Auth;
};
