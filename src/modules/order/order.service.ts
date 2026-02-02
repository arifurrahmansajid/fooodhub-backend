import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateOrderRequest, UpdateCustomerOrderRequest } from "./order.types";

const createOrder = async (data: CreateOrderRequest, userId: string) => {
    let providerCheckId: string = "";
     const items: Array<{ meal: any; quantity: number }> = [];
    let totalAmount: number = 0

    for (const meal of data.meals) {
        const dbMeal = await prisma.meal.findUniqueOrThrow({
            where: {
                id: meal.mealId
            }
        });

        if (providerCheckId === "") {
            providerCheckId = dbMeal.providerId;
        }

        if (dbMeal.providerId !== providerCheckId) {
            throw new AppError("Each order items can belong to only one provider", 400, "MULTIPLE_PROVIDER_ERROR");
        }

        items.push({ meal: dbMeal, quantity: meal.quantity });
        totalAmount = totalAmount + (dbMeal.price * meal.quantity);
    }

    const result = await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                userId: userId,
                providerId: providerCheckId,
                totalAmount: totalAmount
            }
        });

        await tx.orderItem.createMany({
            data: items.map((item) => ({
                orderId: order.id,
                mealId: item.meal.id,
                mealNameSnapshot: item.meal.name,
                unitPriceSnapshot: item.meal.price,
                quantity: item.quantity
            })),
        });

        return tx.order.findUnique({
            where: {
                id: order.id
            },
            include: {
                orderItems: true
            }
        })
    })

    return result;
}

const getAllOrders = async () => {
    const result = await prisma.order.findMany({})
    return result;
}

const getAllUserOrders = async (userId : string) => {
    const result = await prisma.order.findMany({
        where: {
            userId: userId
        }
    })

    return result;
}

const getAllProviderOrders = async (userId : string) => {
    const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            userId: userId
        }
    });

    const result = await prisma.order.findMany({
        where: {
            providerId: provider.id
        }
    })

    return result;
}

const getUserOrderDetails = async (userId : string, orderId : string) => {
    const result = await prisma.order.findUniqueOrThrow({
        where: {
            userId: userId,
            id : orderId
        },
        include: {
            orderItems : true
        }
    })

    return result;
}

const getOrderDetailsForAdmin = async (orderId : string) => {
    const result = await prisma.order.findUniqueOrThrow({
        where: {
            id : orderId
        },
        include: {
            orderItems : true
        }
    })

    return result;
}

const getProviderOrderDetails = async (userId : string, orderId : string) => {
    const provider = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            userId: userId
        }
    });

    const result = await prisma.order.findUniqueOrThrow({
        where: {
            providerId: provider.id,
            id : orderId
        },
        include: {
            orderItems : true
        }
    })

    return result;
}

const updateOrderStatus = async (userId : string, orderId : string) => {
    const order = await prisma.order.findUniqueOrThrow({
        where: {
            id : orderId
        }
    });

    if (order.status === "PREPARING") {
        throw new AppError("Order is already being prepared. You can't cancel now", 400, "BAD_REQUEST");
    };

    if (order.status === "READY") {
        throw new AppError("Order is ready. You can't cancel now", 400, "BAD_REQUEST");
    };

    if (order.status === "CANCELLED") {
        throw new AppError("Order is already cancelled", 400, "BAD_REQUEST");
    };

    const result = await prisma.order.update({
        where: {
            id : orderId,
            userId : userId
        },
        data : {
            status : "CANCELLED"
        }
    })
    
    return result;
}

export const orderService = {
    createOrder,
    getAllUserOrders,
    getAllProviderOrders,
    getUserOrderDetails,
    getProviderOrderDetails,
    updateOrderStatus,
    getAllOrders,
    getOrderDetailsForAdmin
}