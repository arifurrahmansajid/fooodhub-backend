import { Prisma } from "../../generated/client/client";
import { prisma } from "../../lib/prisma";

const getAllMeals = async (searchParam: string, categoryId: string, minPrice: number | undefined, maxPrice: number | undefined, page: number, limit: number, skip: number, sortBy: string, sortOrder: string) => {
    const andConditions: Prisma.MealWhereInput[] = [];

    if (searchParam) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: searchParam,
                        mode: "insensitive"
                    }
                },
                {
                    details: {
                        contains: searchParam,
                        mode: "insensitive"
                    }
                }
            ]
        })
    };

    if (categoryId) {
        andConditions.push({
            categoryId
        })
    };

    if (!minPrice) {
        minPrice = 0;
    }

    if (!maxPrice) {
        maxPrice = 1000000;
    }

    andConditions.push({
        price: {
            gte: minPrice,
            lte: maxPrice
        }
    });


    const meals = await prisma.meal.findMany({
        take: limit,
        skip,
        where: {
            isAvailable: true,
            AND: andConditions
        },
        orderBy: {
            [sortBy]: sortOrder
        },
    });

    const total = await prisma.meal.count({
        where: {
            AND: andConditions
        }
    });


    return {
        data: meals,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}

const getSingleMeal = async (mealId: string) => {
    const result = await prisma.meal.findUniqueOrThrow({
        where: {
            id: mealId,
        },
        include: {
            provider: {
                select: {
                    shopName: true
                }
            },
            reviews: {
                include: {
                    user: true,
                }
            }
        }
    })

    return result;
}



export const mealService = {
    getAllMeals,
    getSingleMeal
}