import User from "../models/User.js"

const registerUser = async (req, res) => {

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

    const newUser = await User.create({
        email,
        password
    });

    return res.status(201).send({
        message: "Usuario creado correctamente",
        user: newUser
    });
}
export default registerUser;