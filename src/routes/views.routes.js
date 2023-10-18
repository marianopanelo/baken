import {Router} from 'express';
import cookieParser from 'cookie-parser';
import { getLogin, getRegister, getTicket, getUsuario } from '../controler/viewsroutes.controler.js';

const router = Router()
router.use(cookieParser("CoderS3cr3tC0d3"));



router.get('/',getLogin);  


router.get("/register", getRegister);

router.get("/current", getUsuario);


router.get("/ticket", getTicket);


export default router;