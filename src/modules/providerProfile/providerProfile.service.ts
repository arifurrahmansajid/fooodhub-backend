import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/AppError";
import { createProviderRequest } from "./providerProfile.types";

const getAllProviders = async () => {
    const result = await prisma.providerProfile.findMany({
        include: {
            user: {
                select: {
                    address: true
                }
            }
        }
    });
    return result;
}

const getSingleProvider = async (providerId: string) => {
    const result = await prisma.providerProfile.findUniqueOrThrow({
        where: {
            id: providerId
        },
        include: {
            meals: true,
            user: {
                include: {
                    address: true
                }
            }
        }
    });

    return result;
}

const createProvider = async (data: createProviderRequest, userId: string) => {
    const result = await prisma.$transaction(async (tx) => {
        const updatedUser = await tx.user.update({
            where: {
                id :userId
            },
            data: {
                role: "PROVIDER"
            }
        });
        
        const providerProfile = await tx.providerProfile.create({
            data: {
                ...data,
                userId
            },
            include: {
                user: {
                    select: {
                        role: true
                    }
                }
            }
        });

        return providerProfile;
    })

    return result;

}

const getSingleProviderByUserId = async (userId : string) => {
    const result = await prisma.providerProfile.findFirst({
        where: {
            userId
        }
    })

    return result;
}

export const providerProfileService = {
    getAllProviders,
    createProvider,
    getSingleProvider,
    getSingleProviderByUserId
}