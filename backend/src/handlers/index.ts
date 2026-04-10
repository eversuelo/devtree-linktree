import User from "../models/User";
import { Request, Response } from "express";
import { hashPassword } from "../utils/auth";
const createAccount = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const user = new User({ ...req.body, password: hashPassword(req.body.password) });
    await user.save();
    console.log(user);
    return res.status(201).json({ message: 'Usuario creado exitosamente' });

}

export { createAccount }