import { Router } from "express";
import { createAccount, login } from "./handlers/index";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";
const router = Router();

router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vacío').isLength({ min: 3 }).withMessage('El handle debe tener al menos 3 caracteres'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
    body('email').isEmail().withMessage('El email es inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    createAccount);

router.post('/auth/login',
    body('email').isEmail().withMessage('El email es inválido'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacía'),
    handleInputErrors,
    login);

export default router;
