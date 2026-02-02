import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";

const getMealReviews = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const mealId = req.params.mealId;

        const result = await reviewService.getMealReviews(mealId as string);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const createReview = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const mealId = req.params.mealId;

        const result = await reviewService.createReview(req.body, userId as string,mealId as string);

        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const reviewController = {
    createReview,
    getMealReviews
}