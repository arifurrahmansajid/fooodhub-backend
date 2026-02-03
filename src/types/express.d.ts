import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

// Extend Express Request to include custom properties
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
                email: string;
                name: string;
                status: string;
            };
        }
    }
}

export { };
