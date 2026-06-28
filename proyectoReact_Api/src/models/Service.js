import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

// Creacion del modelo de datos "Service" que es donde guardamos los datos de todos los servicios ofrecidos
// Con "sequelize.define" le estamos avisando a sequelize que este modelo existe. 
// Abajo de todo dice el nombre de la tabla: tableName: "services"
// Y al hacer sequelize.sync(), si la tabla no existe en la base de datos "pureskin.db", la crea. 
// ... y si existe pero cambiaron los campos (si tiene mas o menos campos, o cambio el tipo de datos, etc)
// la actualiza en la base de datos 

export const Service = sequelize.define(
  "Service",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "services",
    timestamps: false
  }
);
