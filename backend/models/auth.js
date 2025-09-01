'use strict';

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.js";

const Auth = sequelize.define("Auth", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING }
}, { 
  tableName: "auth",
  timestamps: true
});

// Association
Auth.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Auth, { foreignKey: "user_id" });

export default Auth;
