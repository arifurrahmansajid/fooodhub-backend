import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import {Prisma} from "../../prisma/generated/prisma/client";


export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Resource not found",
        },
      });
    }

    if (err.code === "P2002") {
      return res.status(409).json({
        error: {
          code: "DUPLICATE_RESOURCE",
          message: "Duplicate resource",
        },
      });
    }
  }

  console.error(err);

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },
  });
};
