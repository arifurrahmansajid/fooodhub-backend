import { NextFunction, Request, Response } from "express";
import { providerService } from "./provider.service";

const createMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const result = await providerService.createMeal(req.body, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const mealId = req.params.mealId;
        const result = await providerService.updateMeal(req.body, mealId as string, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const removeMeal = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const mealId = req.params.mealId;
        const result = await providerService.removeMeal(mealId as string, userId as string);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const updateOrderStatus = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const orderId = req.params.orderId;

        const result = await providerService.updateOrderStatus(req.body, userId as string, orderId as string);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const providerController ={
    createMeal,
    updateMeal,
    removeMeal,
    updateOrderStatus
}