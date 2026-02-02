import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result = await adminService.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const updateUserStatus = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.params.userId;
        const result = await adminService.updateUserStatus(req.body, userId as string);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export const adminController = {
    getAllUsers,
    updateUserStatus
}