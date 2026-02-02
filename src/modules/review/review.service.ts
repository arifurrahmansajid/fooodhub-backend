import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/AppError";
import { CreateReviewRequest } from "./review.type";

const getMealReviews = async (mealId: string) => {
    const result = await prisma.review.findMany({
        where: {
            mealId: mealId
        }
    });

    return result;
}

const createReview = async (data: CreateReviewRequest, userId: string, mealId: string) => {
    if (data.rating < 1 || data.rating > 5) {
        throw new AppError("Rating must be between 1 and 5", 400, "BAD_REQUEST");
    };

    const deliveredPurchase = await prisma.order.findFirst({
        where: {
            userId,
            status: "DELIVERED",
            orderItems: {
                some: { mealId }, 
            },
        },
        select: { id: true },
    });

    if (!deliveredPurchase) {
        throw new AppError(
            "You can only review meals you've received",
            403,
            "BAD_REQUEST"
        );
    }


    const result = await prisma.review.create({
        data: {
            ...data,
            userId,
            mealId
        }
    });

    return result;
}

export const reviewService = {
    createReview,
    getMealReviews
}
