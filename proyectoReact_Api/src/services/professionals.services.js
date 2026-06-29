import User from "../models/User.js";
import { generateSlots } from "../services/appointment.services.js";

export const getAvailableSlots = async (req, res) => {
    try {
        const { id } = req.params;

        const professional = await User.findByPk(id);
        if (!professional) {
            return res.status(404).json({
                message: "Profesional no encontrado"
            });
        }
        if (professional.role != "professional") {
            return res.status(500).json({
                message: "Ese id no corresponde a un profesional"
            });
        }

        const slots = generateSlots(
            //professional.workDayStart,
            //professional.workDayEnd,
            user.workDayStart,
            user.workDayEnd,
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
            where: { role: "professional" }
        });

        res.json(professionals);
    } catch (error) {
        res.status(500).json(error);
    }
}