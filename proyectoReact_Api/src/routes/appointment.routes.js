import { Router } from "express";
import { getAppointments, createAppointment, getAvailableSlots, updateAppointmentStatus, deleteAppointment } from "../services/appointment.services.js"
import verifyToken from "../middleware/verifytoken.js";

const router = Router();

router.get("/", verifyToken, getAppointments);
router.post("/", verifyToken, createAppointment);
router.get("/:professionalId/available-slots", getAvailableSlots);
router.patch("/:id/status", verifyToken, updateAppointmentStatus);
router.delete("/:id", verifyToken, deleteAppointment);

export default router;