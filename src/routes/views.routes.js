import {Router} from 'express';

const router = Router()

router.get('/',(req,res)=>{
    res.render('login')
});

router.get("/registro", (req, res) => {
    res.render('registro')
});

export default router;