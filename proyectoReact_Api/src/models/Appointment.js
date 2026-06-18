import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pendiente",
        "en curso",
        "terminado",
        "cancelado"
      ),
      defaultValue: "pendiente",
    },
    userId: {
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
    timestamps: false
  }
);