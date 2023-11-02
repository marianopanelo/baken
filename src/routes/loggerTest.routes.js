import { Router } from "express";

const router = Router();

router.get('/', (req,res)=>{
    req.logger.fatal ("probando fatal ")
    req.logger.warning ("probando warning")
    req.logger.http ("probando http")
    res.send("prueba logger")
})

export default router;
