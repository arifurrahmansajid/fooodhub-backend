import { Router } from "express";
import { authService } from "./auth.service";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router : Router = Router();

router.get("/me", authMiddleware("USER", "PROVIDER", "ADMIN"), authService.getUser)

export const authRouter = router;