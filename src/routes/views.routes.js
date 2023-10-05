import {Router} from 'express';
import cookieParser from 'cookie-parser';

const router = Router()
router.use(cookieParser("CoderS3cr3tC0d3"));


router.get('/',(req,res)=>{
    const {username, password} = req.query;
    if (username !== 'pepe' || password !== 'pepepass'){
        return res.status(401).send("Login Failed, check your username and password.");
    } else {
        req.session.user = username;
        req.session.admin = true;
        res.send('Login Successful !');
    }
});  


router.get("/registro", (req, res) => {
    res.render('registro')
});

export default router;