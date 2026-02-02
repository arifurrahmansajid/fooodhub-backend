import {Router} from "express";
import { mealController } from "./meal.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { reviewController } from "../review/review.controller";

const router : Router = Router();

router.get('/', mealController.getAllMeals);
router.get('/:mealId', mealController.getSingleMeal)

router.get('/:mealId/reviews', reviewController.getMealReviews);

router.post('/:mealId/reviews', authMiddleware("USER"), reviewController.createReview)

export const mealRouter = router;