'use strict';

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.js";

const UserDetail = sequelize.define("UserDetail", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.STRING },
  donation_type: { type: DataTypes.STRING },
  newsletter: { type: DataTypes.BOOLEAN },
  events_update: { type: DataTypes.BOOLEAN },
  donation_made: { type: DataTypes.STRING },
  details: { type: DataTypes.STRING }
}, { 
  tableName: "user_details",
  timestamps: true
});

// Association
UserDetail.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(UserDetail, { foreignKey: "user_id" });

export default UserDetail;
