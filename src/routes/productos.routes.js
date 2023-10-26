import { Router, response } from "express";
import { deleteBorrarProducto, getBuscarProductoId, getVerProductos, postAgregarProducto, putModificarProducto } from "../controler/productosroutes.controller.js";
import errorHandler from "../services/error/middlewares/tomaDeErrores.js";


const router = Router();

router.get ("/" , getVerProductos)

router.get("/:id", getBuscarProductoId)

router.post ("/addproduct" ,postAgregarProducto)

router.put("/modificarproducto/:id" ,putModificarProducto)

router.delete ("/borrar/:productoId",deleteBorrarProducto) 


router.use(errorHandler);

export default router;
