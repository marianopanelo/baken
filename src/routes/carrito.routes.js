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


/*agregar desde postman */
router.post("/addProductosNoCarrito" , async(req,res)=>{
    let nuevoProducto = req.body
    await carritoModelo.insertMany(nuevoProducto)
    res.send("se agrego el producto con codigo " + nuevoProducto.codigo + " al carrito")
    let producto = await carritoModelo.findOne({codigo : "bay242"})
    let producto2 = producto._id
    let producto3 = await carritoModelo.findOne({_id : producto2})
    console.log(producto3);
    //console.log((JSON.stringify(producto, null , `/t`)));
    let arrayProducto = await productosModelo.findOne({codigo : "bay242"})
    //let prueba = await productosModelo.findOne({_id : arrayProducto._id})
    //console.log(prueba);
    
    producto.idproducto.push({producto: arrayProducto._id })
})

router.post("/addProductoCarrito/:id", async(req,res)=>{
    let productoId = parseInt(req.params.id)
    console.log(await productos.buscarProductoPorId(productoId));

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