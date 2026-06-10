import { Router } from "express";
import verifyToken from "../middleware/verifytoken.js";
import { getAllUsers, getUserById } from "../services/user.services.js";

const router = Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);

export default router;