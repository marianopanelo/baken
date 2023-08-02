import caritoManager from "../caritomanager.js"
import producManager from "../ProductManager.js"
import { Router, response } from "express";


const router = Router()

const carito = new caritoManager ()


const productos = new producManager()
let productosNombre = await productos.tranformarJSON()
let productoCarritoNombre = await carito.tranformarCarritoJSON()
/* todos los productos del carrito entiendo q en esto solo tenia q mostrar esto , no entendi bien en la diapo, pero supongo q es eso
cree algunos productos en carrito para q tenga algo , que se importan desde indexcarrito ... no entendi bien lo de :cid a que se referia  */
/*router.get ("/" , async (req , res)  =>{
    res.send (await carito.tranformarCarritoJSON())      
}    
) dejo esto comentado */



router.get ("/" , async (req , res)  =>{
    res.render ("home" , {productoCarritoNombre})
}    
)

router.post("/addProductosNoCarrito" , async(req,res)=>{
    let nuevoProducto = req.body
    if (await carito.buscarProductoEnCarritoPorId(nuevoProducto.id) == "producto no encontrado con ese id") {
        await carito.agregarProductoCarrito(nuevoProducto.id)
        res.send("el producto con el id : " + nuevoProducto.id + " fue agregado" )
        
    }else{
        return res.status(400).send({status : "error" ,msj: "ya existe producto con ese id"})
    }
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


/*solo handlebars */
router.get ("/realTimeProducts" , async (req , res)  =>{
    res.render ("realTimeProducts", {productoCarritoNombre} )
}    
)


export default router;