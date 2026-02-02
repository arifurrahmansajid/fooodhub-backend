import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { adminController } from "./admin.controller";

const router : Router = Router();

router.get('/users', authMiddleware("ADMIN"), adminController.getAllUsers);

router.patch('/users/:userId', authMiddleware("ADMIN"), adminController.updateUserStatus);

export const adminRouter = router;