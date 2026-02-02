import { prisma } from "../../lib/prisma"
import { CreateCategoryRequest } from "./category.types"

const getAllCategories = async () => {
    const result = await prisma.category.findMany();
    return result;
}

const createCategory = async (data : CreateCategoryRequest) => {
    const result = await prisma.category.create({
        data
    })

    return result;
}

const updateCategory = async (data : Partial<CreateCategoryRequest>, categoryId : string) => {
    const result = await prisma.category.update({
        where : {
            id: categoryId,
        },
        data : {
            ...data
        }
    });

    return result;
}

const deleteCategory = async (categoryId : string) => {
    const result = await prisma.category.delete({
        where: {
            id : categoryId,
        }
    });

    return result;
}

export const categoryService = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}