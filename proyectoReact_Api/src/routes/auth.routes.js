import {Router} from "express";
import {registerUser, loginUser } from "../services/auth.services.js"

//las rutas de autenticacion
const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);


export default router;