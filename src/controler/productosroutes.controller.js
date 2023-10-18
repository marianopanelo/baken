import { productosService } from "../services/factory.js"

// listo
export const getVerProductos = async(req,res) =>{
    let cantidadTraida = Number(req.query.limit)
    console.log(req.query.limit);
    let productos =  await productosService.verTodosLosProductos()
    let producto =  await productosService.verProductos(cantidadTraida)
    if (!cantidadTraida) {
        return  res.send (productos)
    }
    else {return  res.send (producto)}      
}

// listo 
export const getBuscarProductoId = async(req,res) =>{
    let id = req.params.id
    let producto =  await productosService.buscarProductoPorId(id)
    res.send (producto) 
}

//listo
export const postAgregarProducto = async(req,res) =>{
    let nuevoProducto = req.body
    
    if (!nuevoProducto.title || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.imagen || !nuevoProducto.codigo || !nuevoProducto.stock || !nuevoProducto.categoria){
        return res.status(400).send({status : "error" ,msj: "valores imncompletos cargar title,descripcion,precio,imagen,codigo,stock , revisar datos"})
    }
    await productosService.agregarProductos(nuevoProducto)
    res.send("el producto " + nuevoProducto.title + " fue creado")
}
//listo
export const putModificarProducto = async(req,res) =>{
    let productoCambiado = req.body
    let id = req.params.id
    let productoModificado = await productosService.modificarProducto(id , productoCambiado)
    console.log(productoCambiado);    
    console.log(productoModificado);
    res.send({status: "completado" , message: `produtos actualizados con id ${productoCambiado}`, data : productoModificado})
}
//listo
export const deleteBorrarProducto = async(req,res) =>{
    let id = req.params.productoId
    await productosService.BorrarProducto (id)
    res.send({ status: "Success", message: " el producto con id " + req.params.productoId + " fue Eliminado." });
}