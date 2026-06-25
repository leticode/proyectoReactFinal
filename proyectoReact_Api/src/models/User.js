import { DataTypes} from "sequelize";
import { sequelize } from "../db.js";
import { userRole } from "../enums/enum.js";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email:{
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
    }
},
{
    tableName: "user",
    timestamps: false
})

export default User;