import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./pureskin.db",
  //agregue esto para ver en la terminal cuando
  //se ejecutan las consultas sql. capaz re al pedo pero me deja tranqui de que funciona
  logging: console.log
});