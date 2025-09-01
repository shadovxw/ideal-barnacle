'use strict';

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  mobile: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  role: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { 
  tableName: "users",
  timestamps: true
});

export default User;
