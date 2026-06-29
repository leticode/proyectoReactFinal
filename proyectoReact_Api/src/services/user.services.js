import User from "../models/User.js";
//import { Professionals } from "../models/Professionals.js";
import { Appointment } from "../models/Appointment.js";
import { verifyRole, ValidateUserUpdate, validateCreateUser } from "../middleware/auth.validations.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    const allUsers = await User.findAll();

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
    const { firstName, lastName, email, password, confirmPassword, role = "customer"} = req.body;

    try {
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
            firstName, 
            lastName, 
            email,
            password: hashedPassword,
            role
        });

        if (role === "professional") {
            await User.create({
                workDayStart: 9,
                workDayEnd: 20,
            });
        }

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
        console.error("Error al crear usuario", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, role} = req.body;

    try {
        const errors = ValidateUserUpdate({ firstName, lastName, email, role});

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

        //const previousRole = user.role;

        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.email = email ?? user.email;
        user.role = role ?? user.role;

        //guardamos el usuario
        await user.save();

        /*if (role === "professional") {
            let professional = await Professionals.findOne({
                where: { userId: user.id }
            });

            if (!professional) {
                professional = await Professionals.create({
                    firstName,
                    lastName,
                    workDayStart: 9,
                    workDayEnd: 20,
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
        }*/

        res.json({
            message: "Usuario actualizado",
            user
        });
    } catch(error)
    {
        console.error("Error al actualizar usuario", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

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

        /*if (user.role === "professional") {
            const professional = await Professionals.findOne({
                where: {
                    userId: user.id
                }
            })

            if (professional) {
                await professional.destroy();
            }
        }*/

        await user.destroy();

        res.json({
            message: "Usuario eliminado"
        })

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
