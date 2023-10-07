import { Router } from "express";
import { geterror, getlogin } from "../controler/github-login.views.controler.js";

const router = Router();

router.get('/login', getlogin)

router.get('/error', geterror)



export default router;