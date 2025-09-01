'use strict';

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Subscription = sequelize.define("Subscription", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email_id: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { isEmail: true } 
  }
}, { 
  tableName: "subscriptions",
  timestamps: true
});

export default Subscription;
