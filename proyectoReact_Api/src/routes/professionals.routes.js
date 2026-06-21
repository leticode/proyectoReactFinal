import { Router } from "express";
import { getProfessionals } from "../services/professionals.services.js";
import { getAvailableSlots } from "../services/professionals.services.js";

const router = Router();

router.get("/", getProfessionals);
router.get("/:id/available-slots", getAvailableSlots);

export default router;