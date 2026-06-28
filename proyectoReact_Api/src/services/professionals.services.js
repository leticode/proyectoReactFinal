import User from "../models/User.js";
import { generateSlots } from "../services/appointment.services.js";

export const getAvailableSlots = async (req, res) => {
    try {
        const { id } = req.params;

        const professional = await Professionals.findByPk(id);

        if (!professional) {
            return res.status(404).json({
                message: "Profesional no encontrado"
            });
        }

        const slots = generateSlots(
            professional.workDayStart,
            professional.workDayEnd,
        );

        res.json(slots);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getProfessionals = async (req, res) => {
    try {
        const professionals = await User.findAll({
            where: {role: "professional"}
        });

        res.json(professionals);
    } catch (error) {
        res.status(500).json(error);
    }
}