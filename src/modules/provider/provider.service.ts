import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateMealRequest, UpdateOrderRequest } from "./provider.type";

const createMeal = async (data : CreateMealRequest, userId : string) => {
    const providerProfile = await prisma.providerProfile.findFirst({
        where: {
            userId
        }
    });

    const providerProfileId = providerProfile?.id;
    const providerId = providerProfileId as string;
    
    const result = await prisma.meal.create({
        data : {
            ...data,
            providerId 
        }
    })

    return result;
}

const updateMeal = async (data : Partial<CreateMealRequest>, mealId : string, userId : string) => {
    const providerProfile = await prisma.providerProfile.findFirstOrThrow({
        where: {
            userId : userId
        }
    });

    const providerId = providerProfile.id;

    const existingMeal = await prisma.meal.findFirstOrThrow({
        where: {
            id: mealId,
            providerId: providerId
        }
    });

    const result = await prisma.meal.update({
        where : {
            id : mealId
        },
        data : {
            ...data
        }
    });

    return result;
}

const removeMeal = async (mealId : string, userId : string) => {
    const provider = await prisma.providerProfile.findFirstOrThrow({
        where: {
            userId: userId
        }
    });

    const providerId = provider.id;

    const existingMeal = await prisma.meal.findFirstOrThrow({
        where: {
            id : mealId,
            providerId: providerId,
        }
    });

    const result = await prisma.meal.delete({
        where: {
            id: mealId,
        }
    })

    return result;
}

const updateOrderStatus = async (data : UpdateOrderRequest, userId : string, orderId : string) => {
    const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            userId,
        }
    });

    const order = await prisma.order.findUniqueOrThrow({
        where: {
            id : orderId
        }
    });

    if (order.status === "CANCELLED") {
        throw new AppError("Order is already cancelled.", 400, "BAD_REQUEST");
    }

    const providerId = provider.id;

    const result = await prisma.order.update({
        where: {
            id : orderId,
            providerId : providerId
        },
        data : {
            ...data
        }
    })
    
    return result;
}

export const providerService = {
    createMeal,
    updateMeal,
    removeMeal,
    updateOrderStatus
}