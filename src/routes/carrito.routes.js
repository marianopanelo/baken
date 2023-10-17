import { deleteEliminarcarito, deleteEliminarProducto, getVerCarrito, handlebars, postAgregarACarrito, postSumarCantidadCarrito } from "../controler/carritoroutes.controler.js";
import { Router, response } from "express";

const router = Router()

/* ver carrito*/
router.get ("/" , getVerCarrito)


/*agregar y sumar desde postman con populate ...costo*/
router.post("/addProductosNoCarrito" , postAgregarACarrito)

/*sumarle la cantidad a los productos ya comprados  */
router.post("/addProductoCarrito/:id",postSumarCantidadCarrito)

/*modificar la cantidad con put desde req.body */

//router.put("/products/:id" ,putModificarCantidad)

/*eliminar producto seleccionado del carrito*/
router.delete("/borrarProductoCarrito/:id" ,deleteEliminarProducto) 

/*eliminar todo el carrito */
router.delete("/borrartodoelcarrito" ,deleteEliminarcarito) 


/*solo handlebars */
router.get ("/realTimeProducts" ,handlebars)


export default router;