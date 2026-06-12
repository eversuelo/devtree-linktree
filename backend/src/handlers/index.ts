import User from "../models/User";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
const createAccount = async (req: Request, res: Response) => {
    const { password } = req.body;
    const user = new User({ ...req.body, password: await hashPassword(password) });
    await user.save();
    return res.status(201).json({ message: 'Usuario creado exitosamente' });
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'La contraseña es incorrecta' });
    }
    const token = generateJWT({ id: user._id.toString() });
    return res.status(200).json({ token });
}

const getUser = async (req: Request, res: Response) => {
    return res.status(200).json(req.user);
}

export { createAccount, login, getUser }