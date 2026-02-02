import { NextFunction, Request, Response } from "express";
import { addressService } from "./address.service";

const getUserAddress = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const result = await addressService.getUserAddress(userId as string);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getUserAddressById = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.params?.id;
        const result = await addressService.getUserAddress(userId as string);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


const upsertAddress = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const result = await addressService.upsertAddress(req.body, userId as string);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}



export const addressController = {
    getUserAddress,
    getUserAddressById,
    upsertAddress
}