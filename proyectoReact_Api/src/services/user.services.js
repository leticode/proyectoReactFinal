import  User  from "../models/User.js";
import { validateRegister, verifyRole, ValidateUserUpdate } from "../middleware/auth.validations.js";
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
            message: "Datos invalidos" 
        })
    }

    //verfcamos que le rol exsta para cuando lo creen desde postman o bruno
    const roleErrors = verifyRole(role);
    if (roleErrors.length > 0) {
        return res.status(400).json({
            errors: { role: roleErrors },
            message: "Datos invalidos"
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

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {email, role} = req.body;

    const errors = ValidateUserUpdate({ email, role });
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            errors,
            message: "Datos inválidos"
        });
    }

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            message: "el usuario no existe"
        });
    }

    //s alguno de los dos es indefinido o esta vacio usa el valor anterior
    user.email = email ?? user.email;
    user.role = role ?? user.role;

    await user.save();
    res.json({ 
        message: "Usuario actualizado", 
        user 
    });
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "El usuario no existe"
            });
        }

        await user.destroy();
        res.json({
            message: "Usuario eliminado"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
//crear post para crearlos
//put para mofificarlos

//delete para eliminarlo