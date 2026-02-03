import app from "./app";
import { prisma } from "./lib/prisma";

// Initialize database connection
let isConnected = false;

async function connectDatabase() {
    if (!isConnected) {
        try {
            await prisma.$connect();
            console.log("Connected to Database Successfully!");
            isConnected = true;
        } catch (error) {
            console.error("Database connection error:", error);
            throw error;
        }
    }
}

// Serverless function handler for Vercel
export default async function handler(req: any, res: any) {
    try {
        // Ensure database is connected before handling requests
        await connectDatabase();

        // Pass the request to Express app
        return app(req, res);
    } catch (error) {
        console.error("Function invocation error:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
