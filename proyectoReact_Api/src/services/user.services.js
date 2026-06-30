import User from "../models/User.js";
import { Appointment } from "../models/Appointment.js";
import { verifyRole, ValidateUserUpdate, validateCreateUser, ValidateChangePassword, ValidateUpdateProfile } from "../middleware/auth.validations.js";
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

        const hashedPassword = await bcrypt.hash(password, 10);
 
        let workDayStart = null;
        let workDayEnd = null;

        //por default
        if (role === "professional") {
            workDayStart = 8;
            workDayEnd = 18;
        }

        const newUser = await User.create({
            firstName, 
            lastName, 
            email,
            password: hashedPassword,
            role,
            workDayStart,
            workDayEnd
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

        const roleErrors = verifyRole(role);
        if (roleErrors.length > 0) {
            return res.status(400).json({
                errors: { role: roleErrors },
                message: "Datos invalidos"
            })
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "el usuario no existe"
            });
        }

        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.email = email ?? user.email;
        user.role = role ?? user.role;

        //guardamos el usuario
        await user.save();

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

        await user.destroy();

        res.json({
            message: "Usuario eliminado"
        })

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

/*PROFILE FETCHS */
export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    try {
        const errors = ValidateUpdateProfile({ firstName, lastName});

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors,
                message: "Datos inválidos"
            });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;

        await user.save();

        return res.status(200).json({
            message: "Datos personales actualizados",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

export const changePassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {

        const errors = ValidateChangePassword({ currentPassword, newPassword });
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                errors,
                message: "Datos invalidos"
            });
        }
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "La contraseña actual es incorrecta"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Contraseña actualizada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};