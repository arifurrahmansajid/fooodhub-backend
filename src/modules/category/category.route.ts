import {Router} from "express";
import { categoryController } from "./category.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router : Router = Router();

router.get('/', categoryController.getAllCategories);

router.post('/', authMiddleware("ADMIN"), categoryController.createCategory);

router.put('/:categoryId', authMiddleware("ADMIN"), categoryController.updateCategory);

router.delete('/:categoryId', authMiddleware("ADMIN"), categoryController.deleteCategory);

export const categoryRouter = router;

