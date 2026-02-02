import { NextFunction, Request, Response } from "express";
import { providerProfileService } from "./providerProfile.service";

const getAllProviders = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result = await providerProfileService.getAllProviders();

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getSingleProvider = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const providerId = req.params.providerId;
        const result = await providerProfileService.getSingleProvider(providerId as string);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getSingleProviderByUserId = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const result = await providerProfileService.getSingleProviderByUserId(userId as string);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const createProvider = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.user?.id;
        const result = await providerProfileService.createProvider(req.body, userId as string);

        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}


export const providerProfileController = {
    getAllProviders,
    createProvider,
    getSingleProvider,
    getSingleProviderByUserId
}