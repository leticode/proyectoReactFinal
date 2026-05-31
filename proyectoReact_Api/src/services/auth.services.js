import User from "../models/User.js";
//importamos la libreria bcrypt para hashear la contrasena
//antes de guardarla
import bcrypt from "bcrypt" ;

export const registerUser = async (req, res) => {

    //obtenemos los datos del body
    const {email, password, confirmPassword} = req.body;

    //confirmamos que las contrasenas sean iguales
    if (password !== confirmPassword){
        return res.status(400).send({message: "Las contrasenas no coinciden"})
    }

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
            email: newUser.email
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

    return res.status(200).send({
        message: "Login exitoso",
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    });

    //Clave secreta para firmar el token (debería estar en variables de entorno)
    //const secretKey = 'programacion3-2025';

    // Genera un token JWT que expira en 1 hora
    //const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    // Devuelve el token al cliente
    //return res.json(token);
}