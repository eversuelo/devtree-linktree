import { Router } from "express";
import User from "./models/User";
const router = Router();

/** Autenticación y Registro */
router.post('/auth/register', async (req, res) => {
    const user=new User(req.body);
    await user.save();
    console.log(user);
    res.send('Registro de usuario');
    
    }
);
export default router;