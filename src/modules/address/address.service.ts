import { prisma } from "../../lib/prisma";
import { CreateAddressRequest } from "./address.types";


const getUserAddress = async (userId : string) => {
    const result = await prisma.address.findUniqueOrThrow({
        where: {
            userId
        }
    });

    return result;
}

const upsertAddress = async (data : CreateAddressRequest, userId : string) => {
    const result = await prisma.address.upsert({
        where: {
            userId: userId
        },
        update: {
            ...data
        },
        create: {
            ...data,
            userId
        }
    });

    return result;
}


export const addressService = {
    getUserAddress,
    upsertAddress
}