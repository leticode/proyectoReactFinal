import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'CF',
        },
    },
    {
        tableName: "Categories",
        timestamps: false
    }
);