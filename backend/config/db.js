import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "vyfoundation", // database
  "postgres",     // user
  "postgres",     // password
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: false,
  }
);
