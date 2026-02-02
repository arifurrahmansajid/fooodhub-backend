import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

const getAllCategories = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result = await categoryService.getAllCategories();

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const createCategory = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result = await categoryService.createCategory(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const categoryId = req.params.categoryId;
        const result = await categoryService.updateCategory(req.body, categoryId as string);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const deleteCategory = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const categoryId = req.params.categoryId;
        const result = await categoryService.deleteCategory(categoryId as string);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export const categoryController = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}