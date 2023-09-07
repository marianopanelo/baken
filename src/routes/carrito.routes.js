import caritoManager from "../caritoManager.js"
import { carritoModelo } from "../dao/models/carrito.models.js";
import { productosModelo } from "../dao/models/products.js";
import producManager from "../ProductManager.js"
import { Router, response } from "express";

const router = Router()

const carito = new caritoManager ()


const productos = new producManager()
let productoCarritoNombre = await carito.tranformarCarritoJSON()
/* todos los productos del carrito entiendo q en esto solo tenia q mostrar esto , no entendi bien en la diapo, pero supongo q es eso
cree algunos productos en carrito para q tenga algo , que se importan desde indexcarrito ... no entendi bien lo de :cid a que se referia  */
/*router.get ("/" , async (req , res)  =>{
    res.send (await carito.tranformarCarritoJSON())      
}    
) dejo esto comentado */


/* ver carrito*/
router.get ("/" , async (req , res)  =>{
    let carritoTotal = await carritoModelo.find()

    return  res.send ( carritoTotal)}   
)


/*agregar y sumar desde postman con populate ...costo*/
router.post("/addProductosNoCarrito" , async(req,res)=>{
    let nuevoProducto = req.body
    if (!nuevoProducto.codigo){
        return res.status(400).send({status : "error" ,msj: "valores imncompletos cargar codigo del producto"})
    }

    await carritoModelo.insertMany(nuevoProducto)
    res.send("se agrego el producto con codigo " + nuevoProducto.codigo + " al carrito")
    /*populate */
    console.log(nuevoProducto.codigo);
    let productoCarrito = await carritoModelo.findOne({codigo : nuevoProducto.codigo})
    console.log(productoCarrito);
    let productoAAgregar = await productosModelo.findOne({codigo : nuevoProducto.codigo})
    console.log(productoAAgregar);
    productoCarrito.cantidad.push( {producto : productoAAgregar._id})
    let resultado = await carritoModelo.updateOne(productoCarrito)
    console.log(resultado);
    let carritoYProducto = await carritoModelo.findOne({codigo : nuevoProducto.codigo}).populate(`cantidad.producto`)
    console.log(JSON.stringify(carritoYProducto, null , `/t`));
})

/*sumarle la cantidad a los productos ya comprados  */
router.post("/addProductoCarrito/:id", async(req,res)=>{
    let productoId = parseInt(req.params.id)
    let productoCarrito = await carritoModelo.findOne({_id : productoId})
    console.log(productoCarrito);

    if (await productos.buscarProductoPorId(productoId) == "producto no encontrado con ese id") {
        return res.status(400).send({status : "error" ,msj: "no existe producto con ese id"})
    }else{
    await carito.agregarProductoCarrito(productoId)
    res.send("el producto con el id : " + productoId + " fue agregado" )
    }

})

/*modificar la cantidad con put desde req.body */

router.put("/products/:id" , async (req,res)=>{
    let cantidadCambiada = req.body
    let productoCarritpModificado = await carritoModelo.updateOne({_id : req.params.id},{$set : cantidadCambiada})
    console.log(cantidadCambiada);    
    console.log(productoCarritpModificado);
    res.send({status: "completado" , message: `se actualizo la compra con el id ${req.params.id}`, data : productoCarritpModificado})
})

/*eliminar producto seleccionado del carrito*/
router.delete("/borrarProductoCarrito/:id" , async (req,res)=>{
    await carritoModelo.deleteOne ( {_id : req.params.id} )
    res.send({ status: "Success", message: " el producto con id " + req.params.id + " fue Eliminado del carrito " });
}) 

/*eliminar todo el carrito */
router.delete("/borrartodoelcarrito" , async (req,res)=>{
    await carritoModelo.deleteMany()
    res.send({ status: "Success", message: " el carrito fue eliminado " });
}) 


/*solo handlebars */
router.get ("/realTimeProducts" , async (req , res)  =>{
    res.render ("realTimeProducts", {productoCarritoNombre} )
}    
)


export default router;