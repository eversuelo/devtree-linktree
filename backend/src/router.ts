import { Router } from "express";
import slug from "slug";
import { createAccount, login, getUser } from "./handlers/index";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";
import User from "./models/User";
const router = Router();

router.post('/auth/register',
    body('handle')
        .notEmpty().withMessage('El handle no puede ir vacío')
        .isLength({ min: 3 }).withMessage('El handle debe tener al menos 3 caracteres')
        .customSanitizer(value => slug(value))
        .custom(async (handle) => {
            const exists = await User.findOne({ handle });
            if (exists) throw new Error('El handle no está disponible');
        }),
    body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail().withMessage('El email es inválido')
        .custom(async (email) => {
            const exists = await User.findOne({ email });
            if (exists) throw new Error('El email ya está registrado');
        }),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    createAccount);

router.post('/auth/login',
    body('email').isEmail().withMessage('El email es inválido'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacía'),
    handleInputErrors,
    login);

router.get('/user', authenticate, getUser);

export default router;
