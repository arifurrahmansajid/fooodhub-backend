import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
type AuthUser = NonNullable<Session>["user"];

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

type ROLE = "USER" | "ADMIN" | "PROVIDER";


export const authMiddleware = (...roles : ROLE[]) => async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    })

    if (!session?.user) {
        return res.status(401).json({message : "You are not logged in!"});
    }

    if (roles.length > 0 && !roles.includes(session.user.role as ROLE)) {
        return res.status(403).json({message: "Forbidden!"});
    }

    req.user = session.user;
    return next();
}