import {Router} from 'express';
import cookieParser from 'cookie-parser';
import { getLogin, getRegister } from '../controler/viewsroutes.controler.js';

const router = Router()
router.use(cookieParser("CoderS3cr3tC0d3"));


router.get('/',getLogin);  


router.get("/register", getRegister);

export default router;