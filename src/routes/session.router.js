import { Router } from 'express';
import { getFailRegister, postLoguinUsuario, postRegister } from '../controler/sessionsRouter.controler.js';
import passport from 'passport';

const router = Router();


router.post("/register", passport.authenticate('register', { failureRedirect: '/api/fail-register' }),postRegister)


router.get("/fail-register",getFailRegister);

router.post("/", postLoguinUsuario);


export default router;