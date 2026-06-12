import jwt from "jsonwebtoken";

export const generateJWT = (payload: { id: string }) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '30d' });
}
