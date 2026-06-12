import User from "../models/User";
import slug from "slug";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/auth";
const createAccount = async (req: Request, res: Response) => {
    const { email, password, handle } = req.body;
    const userExistEmail = await User.findOne({ email });
    const userExistHandle = await User.findOne({ handle });
    if (userExistEmail || userExistHandle) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const user = new User({ ...req.body, password: await hashPassword(password), handle: slug(handle) });
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
    return res.status(200).json({ message: 'Autenticado correctamente' });
}

export { createAccount, login }