'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    verify_otp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },

    verify_otp_expire_at: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },

    is_account_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    reset_otp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },

    reset_otp_expire_at: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: 'users',
    timestamps: true,         // automatically manages created_at, updated_at
    underscored: true,        // uses snake_case
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  User.associate = function(models) {
    if (models.Auth) {
      User.hasMany(models.Auth, { foreignKey: 'user_id', as: 'auths' });
    }
  };

  return User;
};
