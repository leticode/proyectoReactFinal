import {Router} from "express";
import { registerUser, loginUser } from "../services/auth.services.js"
import { verifyLogin, verifyRegister } from "../middleware/auth.validations.js";

//las rutas de autenticacion
const router = Router();

router.post("/login", verifyLogin, loginUser);
router.post("/register", verifyRegister, registerUser);


export default router;