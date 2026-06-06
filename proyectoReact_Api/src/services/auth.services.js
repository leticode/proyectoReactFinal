import User from "../models/User.js";
//importamos la libreria bcrypt para hashear la contrasena
//antes de guardarla
import bcrypt from "bcrypt" ;
//lbrera para generar token
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    //obtenemos los datos del body
    const {email, password, confirmPassword, role} = req.body;

    //buscamos si el usuario existe
    const user = await User.findOne({
        where: {
            email
        }
    });

    //si existe se manda mensaje de error
    if (user){
        return res.status(400).send({message: "Usuario existente"})
    }

    //indica cuantas veces bcrypt va a procesar la contrasena
    //mientras mas alto el numero mas segura pero mas lento el proceso
    const saltRounds = 10;

    //salt es una cadena aleatoria generada a la que se agrega
    //a la contrasena antes de hashearla 
    //porq si hay dos usuarios con las contrasenas igales pueden
    //generar el mismo hash 
    const salt = await bcrypt.genSalt(saltRounds);

    //creamos el hash con la contrasena escrta por el usuario y el salt generado aleatoriamente
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        email,
        //cuando creamos el usuaro la contrasena se guarda hasheada en la bdd
        password: hashedPassword,
    });

    //devolvemos el d y el email y un mensaje de quese creo el usuario
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

    // Busca el usuario por email
    const user = await User.findOne({
        where: { email }
    });

    // Si no existe, devuelve error 401 (No autorizado)
    if (!user)
        return res.status(401).send({ message: "Usuario no existente" });

    // Compara la contraseña ingresada con el hash almacenado
    const comparison = await bcrypt.compare(password, user.password);

        // Si no coinciden, devuelve error 401
    if (!comparison)
        return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

    //creamos la clave secreta para el token
    const JWTsecretKey = '2tup2pureSkin-2026'

    //generamos el token
    const token = jwt.sign(
        {
            //payload osea la informacion queva guardada dentro del token
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWTsecretKey,
        //desp de una hora deja de ser valido
        {expiresIn: '1h'}
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