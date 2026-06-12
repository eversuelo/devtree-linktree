import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    const token = bearer.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof payload === 'object' && payload.id) {
            const user = await User.findById(payload.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'El usuario no existe' });
            }
            req.user = user;
            return next();
        }
        return res.status(401).json({ message: 'Token no válido' });
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
}
