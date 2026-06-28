import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { userRole } from "../enums/enum.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(Object.values(userRole)),
    allowNull: false,
    defaultValue: userRole.CUSTOMER,
  },
  workDayStart: {//cuando vos cambien el rol de esa persona solo modicas eso (rol) user > prof solicito horario
    type: DataTypes.INTEGER,
    allowNull: true
  },
  workDayEnd: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
},
  {
    tableName: "user",
    timestamps: false
  })

export default User;