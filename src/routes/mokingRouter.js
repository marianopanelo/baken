import { Router } from "express";
import { getMoking } from "../controler/moking.controler.js";

const router = Router();

router.get('/',getMoking);  

export default router;