import  User  from "../models/User.js";
import { validateRegister, verifyRole } from "../middleware/auth.validations.js";
import bcrypt from "bcrypt";

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

export const createUser = async (req, res) => {
    //traemoslos datos del body con el rol por default
    const {email, password, confirmPassword, role = "customer"} = req.body;   

    const errors = validateRegister({email, password, confirmPassword});
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ 
            errors, 
            message: "Datos inválidos" 
        })
    }

    //verfcamos que le rol exsta para cuando lo creen desde postman o bruno
    const roleErrors = verifyRole(role);
    if (roleErrors.length > 0) {
        return res.status(400).json({
            errors: { role: roleErrors },
            message: "Datos inválidos"
        })
    }

    const userExists = await User.findOne({
        where: {
            email
        }
    });
    
    if (userExists){
        return res.status(400).send({message: "Usuario existente"})
    }

    //hasheamos la ocntrasena
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
        email,    
        password: hashedPassword,
        role
    });
     
    return res.status(201).send({
        message: "Usuario creado correctamente",
        user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        }
    });
}; 

export const updateUser = (req, res) => {
    const {id} = req.params;
};

export const deleteUser = (req, res) => {
    const {id} = req.params;

};
//crear post para crearlos
//put para mofificarlos

//delete para eliminarlo