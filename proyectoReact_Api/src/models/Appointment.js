import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import User from "./User.js";
import { Service } from "./Service.js";

export const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "cancelled",
        "completed"
      ),
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "appointment",
  }
);//FK preguntar a marcelo