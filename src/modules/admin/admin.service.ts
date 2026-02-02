import { prisma } from "../../lib/prisma"
import { UserStatusRequest } from "./admin.type";

const getAllUsers = async () => {
    const result = await prisma.user.findMany();

    return result;
}


const updateUserStatus = async (body: UserStatusRequest, userId : string) => {
    const result = await prisma.user.update({
        where: {
            id : userId,
        },
        data : {
            status : body.status
        }
    });

    return result;
}

export const adminService = {
    getAllUsers,
    updateUserStatus
}