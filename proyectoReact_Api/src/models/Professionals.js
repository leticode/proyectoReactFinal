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
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, //pq debe tener una sola ficha profesional
    },
  },
  {
    tableName: "professional",
    timestamps: false
  }
);