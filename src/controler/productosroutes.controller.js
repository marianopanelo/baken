import { productosModelo } from "../dao/models/products.js"

// listo
export const getVerProductos = async(req,res) =>{
    let cantidadTraida = Number(req.query.limit)
    let product = await productosModelo.paginate({ categoria :  "juego" }, { limit: cantidadTraida, page: 1 }) /*en limit te va a traer primero las mas baratos  */
    let productosTotales = await productosModelo.find().sort({precio : 1})
    if (!cantidadTraida) {return  res.send (productosTotales)}
    else {return  res.send ( product)}      
}

// listo aunq tenes q buscar todo el id del producto en este
export const getBuscarProductoId = async(req,res) =>{
    let producto = await productosModelo.find({_id : req.params.id})
    res.send (producto) 
}

//listo
export const postAgregarProducto = async(req,res) =>{
    let nuevoProducto = req.body
    
    if (!nuevoProducto.title || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.imagen || !nuevoProducto.codigo || !nuevoProducto.stock || !nuevoProducto.categoria){
        return res.status(400).send({status : "error" ,msj: "valores imncompletos cargar title,descripcion,precio,imagen,codigo,stock , revisar datos"})
    }
    await productosModelo.insertMany(nuevoProducto)
    res.send("el producto " + nuevoProducto.title + " fue creado")
}
//listo
export const putModificarProducto = async(req,res) =>{let productoCambiado = req.body
    let productoModificado = await productosModelo.updateOne({_id : req.params.id},{$set : productoCambiado})
    console.log(productoCambiado);    
    console.log(productoModificado);
    res.send({status: "completado" , message: `produtos actualizados con id ${productoCambiado}`, data : productoModificado})
}
//listo
export const deleteBorrarProducto = async(req,res) =>{await productosModelo.deleteOne ( {_id : req.params.productoId} )
res.send({ status: "Success", message: " el producto con id " + req.params.productoId + " fue Eliminado." });
}