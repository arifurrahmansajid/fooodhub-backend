import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    advanced: {
        disableOriginCheck: true
    },
    user : {
        additionalFields: {
            role: {
                type : "string",
                defaultValue: "USER"
            },
            status : {
                type : "string",
                defaultValue: "ACTIVE"
            }
        }
    },
    emailAndPassword: {
        enabled: true
    }
});