import { Router } from "express";
import { getProfessionals } from "../services/professionals.services.js";

const router = Router();

router.get("/", getProfessionals);

export default router;