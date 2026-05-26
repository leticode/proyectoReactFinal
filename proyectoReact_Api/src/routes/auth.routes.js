import {Router} from "express";
import registerUser from "../services/auth.services.js"

const router = Router();

router.post("/register", registerUser);


export default router;