import {Router} from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { addressController } from "./address.controller";

const router : Router = Router();

router.get('/', authMiddleware("USER", "PROVIDER"), addressController.getUserAddress);

router.get('/:id', authMiddleware("USER", "PROVIDER"), addressController.getUserAddressById);

router.post('/', authMiddleware("USER", "PROVIDER"), addressController.upsertAddress);

export const addressRouter = router;