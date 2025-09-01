'use strict';

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.js";

const UserCredential = sequelize.define("UserCredential", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false }
}, { 
  tableName: "user_credentials",
  timestamps: true
});

// Association
UserCredential.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(UserCredential, { foreignKey: "user_id" });

export default UserCredential;
