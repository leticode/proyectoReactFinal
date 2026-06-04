import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";



export const Professionals = sequelize.define(
  "Professionals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: "professional",
  }
);