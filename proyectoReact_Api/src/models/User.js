import { DataTypes} from "sequelize";
import { sequelize } from "../db.js";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    //se pone esto para que no se cree una columna con
    //la feha y hora en la que se creo el registro 
    //y de la ultima vez que se modifico el registro.
    timestamps: false
})

export default User;