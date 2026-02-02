import {Router} from "express";
import { providerProfileController } from "./providerProfile.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router : Router = Router();

router.get('/', providerProfileController.getAllProviders);

router.get('/me', authMiddleware("PROVIDER"),providerProfileController.getSingleProviderByUserId);

router.post('/', authMiddleware("USER"), providerProfileController.createProvider);

router.get('/:providerId', providerProfileController.getSingleProvider);

export const providerProfileRouter = router;