import { Router } from 'express';
import { getFailRegister, getGit, getGitCollback, postLoguinUsuario, postRegister } from '../controler/sessionsRouter.controler.js';
import passport from 'passport';

const router = Router();

router.post("/", postLoguinUsuario);

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/fail-register' }),postRegister)

router.get("/fail-register",getFailRegister);

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), getGit);

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), getGitCollback);


export default router;