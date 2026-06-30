import User from "../models/User.js";
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword, role} = req.body;

    try{
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
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).send({
            message: "Usuario creado correctamente",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch(error)
    {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
    const user = await User.findOne({
        where: { email }
    });

    if (!user)
        return res.status(401).send({ message: "Usuario no existente" });


    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
        return res.status(401).send({ message: "Email y/o contraseña incorrecta" });


    const JWTsecretKey = process.env.JWT_SECRET

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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    });
    } catch (error) 
    {
        console.error("Error en el login", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}