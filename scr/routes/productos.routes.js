import { Router, response } from "express";
import producManager from "../ProductManager.js"

const router = Router();

const productos = new producManager()
const producotsJSON = await productos.tranformarJSON()
productos.buscarProductoPorId()

/*todos con limite */
router.get ("/" , async (req , res)  =>{
    let limit = Number(req.query.limit)
    let productosPedidos = producotsJSON.slice(0,limit)
    if (!limit) {return  res.send ( producotsJSON)}
    else {return  res.send ( productosPedidos)}      
}    
)
/*buscar por id lo malo de este es q tenes q buscar el id */
router.get("/:id", async (req , res) =>{
    let producto = await productos.buscarProductoPorId(req.params.id)
    res.send (producto) 
})


/*agregar */
router.post ("/addproduct" ,async (req , res) =>{
    let nuevoProducto = req.body
    
    if (!nuevoProducto.title || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.imagen || !nuevoProducto.codigo || !nuevoProducto.stock){
        return res.status(400).send({status : "error" ,msj: "valores imncompletos cargar title,descripcion,precio,imagen,codigo,stock , revisar datos"})
    }

    await productos.agregarProducto(nuevoProducto.title,nuevoProducto.descripcion ,nuevoProducto.precio , nuevoProducto.imagen , nuevoProducto.codigo , nuevoProducto.stock)
    res.send("el producto " + nuevoProducto.title + " fue creado")
}
)

/* modificar */
router.put("/modificarproducto/:id" , async (req,res)=>{
    let productoId = parseInt(req.params.id)
    let productoCambiado = req.body
    productoCambiado.id = productoId
    await productos.actualizarProducto(productoCambiado)
    res.send({status: "completado" , message: `produtos actualizados con id ${productoCambiado}`, data : productoCambiado})
})

/*borrar me tira un error , no se que es , pero me borra el producto y sigue andando todo bien asi q lo deje asi */
router.delete ("/borrar/:productoId", async (req,res)=>{
    let produc =  parseInt(req.params.productoId)
    await productos.borrarProductoPorID(produc)
    const productosTotales = producotsJSON.length
    if (producotsJSON.length == productosTotales) {
        return response.status(500).send({ status: "error", error: "el producto no se pudo borrar." });
    }
    
    res.send({ status: "Success", message: "producto Eliminado." });
}) 
    



export default router;
