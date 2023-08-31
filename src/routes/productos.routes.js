import { Router, response } from "express";
import producManager from "../ProductManager.js"
import { productosModelo } from "../dao/models/products.js";


const router = Router();

const productos = new producManager()
productos.buscarProductoPorId()

/*todos y con limite */ /*aca pude hacer lo de que te tome el precio de menor a mayor , lo de paginate lo puse en lo de limit porque lo veia mas proligo a q este en el que estan todos los productos
y encima no me salia hacer lo de sort cuando ponia paginate */
router.get ("/" , async (req , res)  =>{
    let cantidadTraida = Number(req.query.limit)
    let product = await productosModelo.paginate({ categoria :  "juego" }, { limit: cantidadTraida, page: 1 }) /*en limit te va a traer primero las mas baratos  */
    let productosTotales = await productosModelo.find().sort({precio : 1})
    if (!cantidadTraida) {return  res.send (productosTotales)}
    else {return  res.send ( product)}      
}    
)
/*buscar por id lo malo de este es q tenes q buscar el id del producto
buscar elemento por query*/
router.get("/:id", async (req , res) =>{

    let producto = await productosModelo.find({_id : req.params.id})
    res.send (producto) 
})


/*agregar */
router.post ("/addproduct" ,async (req , res) =>{
    let nuevoProducto = req.body
    
    if (!nuevoProducto.title || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.imagen || !nuevoProducto.codigo || !nuevoProducto.stock || !nuevoProducto.categoria){
        return res.status(400).send({status : "error" ,msj: "valores imncompletos cargar title,descripcion,precio,imagen,codigo,stock , revisar datos"})
    }
    await productosModelo.insertMany(nuevoProducto)
    res.send("el producto " + nuevoProducto.title + " fue creado")
}
)

/* modificar */
router.put("/modificarproducto/:id" , async (req,res)=>{
    let productoCambiado = req.body
    let productoModificado = await productosModelo.updateOne({_id : req.params.id},{$set : productoCambiado})
    console.log(productoCambiado);    
    console.log(productoModificado);
    res.send({status: "completado" , message: `produtos actualizados con id ${productoCambiado}`, data : productoModificado})
})

/*borrar*/
router.delete ("/borrar/:productoId", async (req,res)=>{
    await productosModelo.deleteOne ( {_id : req.params.productoId} )
    res.send({ status: "Success", message: " el producto con id " + req.params.productoId + " fue Eliminado." });
}) 
    



export default router;
