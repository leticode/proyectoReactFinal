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
    //agregue estos dos campos donde vamos a tener el nombre y apellido del profesional
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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