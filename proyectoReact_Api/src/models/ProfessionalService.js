import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ProfessionalService = sequelize.define(
  "ProfessionalService",
  {
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "professional_services",
    timestamps: false,
  }
);