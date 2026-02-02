import {Router} from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { providerController } from "./provider.controller";

const router : Router = Router();

router.post('/meals', authMiddleware("PROVIDER"), providerController.createMeal);

router.put('/meals/:mealId', authMiddleware("PROVIDER"), providerController.updateMeal);

router.delete('/meals/:mealId', authMiddleware("PROVIDER"), providerController.removeMeal);

router.put('/orders/:orderId', authMiddleware("PROVIDER"), providerController.updateOrderStatus)

export const providerRouter = router;