import User from "../models/User.js";
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken";
import { validateRegister, validateLogin } from "../middleware/auth.validations.js";

export const registerUser = async (req, res) => {
    const {email, password, confirmPassword, role} = req.body;

    const errors = validateRegister({email, password, confirmPassword });
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(
                { errors, 
                    message: "Datos inválidos" 
                });
        }

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (user){
        return res.status(400).send({message: "Usuario existente"})
    }

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

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


}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const errors = validateLogin({email, password});
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(
            { errors }
        );
    }
    // Busca el usuario por email
    const user = await User.findOne({
        where: { email }
    });

    // Si no existe, devuelve error 401 (No autorizado)
    if (!user)
        return res.status(401).send({ message: "Usuario no existente" });


    const comparison = await bcrypt.compare(password, user.password);

    // Si no coinciden, devuelve error 401
    if (!comparison)
        return res.status(401).send({ message: "Email y/o contraseña incorrecta" });


    const JWTsecretKey = '2tup2pureSkin-2026'

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWTsecretKey,
        {expiresIn: '2h'}
    )
    return res.status(200).send({
        message: "Login exitoso",
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    });

}