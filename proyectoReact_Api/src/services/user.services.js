import User from "../models/User.js";
import { Professionals } from "../models/Professionals.js";
import { Appointment } from "../models/Appointment.js";
import { verifyRole, ValidateUserUpdate, validateCreateUser } from "../middleware/auth.validations.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    const allUsers = await User.findAll({
        //anadi esto para que cuando en la tabla se muestren los usuarios
        //os que sean professionales traigan el nombre y apellido
        include: [
            {
                //basicamente aca le mandamos al front el modelo profesional
                //llamado profesional asi despues puedo hacer un operador ternario para mostrar el campo
                // de nombre y apellido cuando se aprete la opcion de profesional
                model: Professionals,
                as: "professional",
                attributes: ["firstName", "lastName"]
            }
        ]
    });

    res.json(allUsers);
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const UserById = await User.findByPk(id);

    if (!UserById)
        return res.status(404).json({ message: 'Id inexistente' });

    res.json(UserById);

};

export const createUser = async (req, res) => {
    //traemoslos datos del body con el rol por default y agregue el nombre y el apellido para el prof
    const { email, password, confirmPassword, role = "customer", firstName, lastName } = req.body;

    const errors = validateCreateUser(req.body);
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

    if (userExists) {
        return res.status(400).send({ message: "Usuario existente" })
    }

    //hasheamos la ocntrasena
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password: hashedPassword,
        role
    });

    //esto podriamos hacer para guardar el profesional en la tabla profesional
    if (role === "professional") {
        await Professionals.create({
            firstName,
            lastName,
            workayStart: 9,
            workayEnd: 20,
            userId: newUser.id,
        });
    }

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
    const { id } = req.params;
    const { email, role, firstName, lastName } = req.body;

    const errors = ValidateUserUpdate({ email, role, firstName, lastName });

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

    const previousRole = user.role;

    user.email = email ?? user.email;
    user.role = role ?? user.role;

    //guardamos el usuario
    await user.save();

    //aca si el rol seria profesion tendriamos q actualizar a tabla professional tamb
    // Si es profesional, actualizar su ficha y si no es profesional pero lo querems cambiar a profesional
    //tedriamos que crear su ficha
    if (role === "professional") {
        let professional = await Professionals.findOne({
            where: { userId: user.id }
        });

        //si el profesional no existe lo crea
        if (!professional) {
            professional = await Professionals.create({
                firstName,
                lastName,
                workayStart: 9,
                workayEnd: 20,
                userId: user.id
            });
        } else {

            professional.firstName = firstName;
            professional.lastName = lastName;

            await professional.save();
        }
    } else if (previousRole === "professional") {
        const professional = await Professionals.findOne({
            where: { userId: user.id }
        });

        if (professional) {
            await Appointment.destroy({
                where: { professionalId: professional.id }
            });
            await professional.destroy();
        }
    }

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
            })
        }

        if (user.role === "professional") {
            const professional = await Professionals.findOne({
                where: {
                    userId: user.id
                }
            })

            if (professional) {
                await professional.destroy();
            }
        }

        await user.destroy();

        res.json({
            message: "Usuario eliminado"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
