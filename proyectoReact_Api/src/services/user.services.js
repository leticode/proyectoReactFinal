import  User  from "../models/User.js";
import { verifyRegister, verifyRole } from "../middleware/auth.validations.js";

export const getAllUsers = async (req, res) => {
    const allUsers = await User.findAll();
    res.json(allUsers);
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const UserById = await User.findByPk(id);
    
    if(!UserById)
    return res.status(404).json({message: 'Id inexistente'});

    res.json(UserById);

};


export const createUser = ((req, res) => {

}); 
//crear post para crearlos
//put para mofificarlos

//delete para eliminarlo