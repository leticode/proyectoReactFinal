import { Router } from "express";
import verifyToken from "../middleware/verifytoken.js";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../services/user.services.js";
import { updateProfile, changePassword } from "../services/user.services.js";

const router = Router();

router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

router.put("/profile/:id", verifyToken, updateProfile);
router.put("/profile/:id/password", verifyToken, changePassword);

export default router;