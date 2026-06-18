import { Professionals } from "../models/Professionals.js";

export const getProfessionals = async (req, res) => {
    try {
        const professional = await Professionals.findAll();

        res.json(professional);
    } catch (error) {
        res.status(500).json(error);
    }
}