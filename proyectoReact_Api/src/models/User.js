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
        //.ENUM permite solo tener valores predefinidos
        type: DataTypes.ENUM(Object.values(userRole)),
        allowNull: false,
        //que por default ponga el rol de user
        defaultValue: userRole.CUSTOMER,
    }
},
{
    tableName: "user",
    //se pone esto para que no se cree una columna con
    //la feha y hora en la que se creo el registro 
    //y de la ultima vez que se modifico el registro.
    timestamps: false
})

export default User;