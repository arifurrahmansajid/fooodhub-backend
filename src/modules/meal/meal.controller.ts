import { NextFunction, Request, Response } from "express";
import { mealService } from "./meal.service";
import paginationSortingHelper, { pageSortInput } from "../../helper/sortingAndPaginationHelper";

const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {searchParam, categoryId, minPrice, maxPrice} = req.query;

        const minpriceNumber = typeof minPrice === "string" ? Number(minPrice) : undefined;

        const maxpriceNumber = typeof maxPrice === "string" ? Number(maxPrice) : undefined;

        const allowedSortByOptions = ["name", "price"];

        const {page, limit, skip, sortBy, sortOrder} = paginationSortingHelper(req.query, allowedSortByOptions);

        const result = await mealService.getAllMeals(searchParam as string, categoryId as string, minpriceNumber, maxpriceNumber, page, limit, skip, sortBy, sortOrder);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getSingleMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mealId = req.params.mealId;
        const result = await mealService.getSingleMeal(mealId as string);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export const mealController = {
    getAllMeals,
    getSingleMeal,
}