import { carritoModelo } from "../dao/models/carrito.models.js"
import CustomError from "../services/error/customError.js"
import EErrors from "../services/error/enumeracionDeError.js"
//import { productosModelo } from "../dao/models/products.js"
import { carritoService } from "../services/factory.js"


// listo
export const getVerCarrito = async(req,res) =>{
    let carritoTotal = await carritoService.vertodos()
    return  res.send ( carritoTotal)
}

// listo 
export const postAgregarACarrito = async (req, res) => {
    let nuevoProducto = req.body
    if (!nuevoProducto.codigo){
        CustomError.createError({
            name: "error al cargar un producto al carrito " , 
            message: "valores imncompletos cargar codigo del producto",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
    await carritoService.agregarAlCarrito(nuevoProducto)
    res.send("se agrego el producto con codigo " + nuevoProducto.codigo + " al carrito")
    // no entiendo porque me dejo de entrar al populate , hace 5 minutos lo probe y andaba
    await carritoService.agregarAlCarritoPopulate(nuevoProducto)
    console.log(nuevoProducto);
}


// listo
export const postSumarCantidadCarrito = async (req, res) => {
    let id = req.params.id
    let productoCarrito = await carritoService.buscarUnProductoCarrito(id)
    console.log(productoCarrito.cantidad[0].producto);
    productoCarrito.cantidad.push( {producto : productoCarrito.cantidad[0].producto})
    let productoCarritoModificado = productoCarrito
    console.log(productoCarritoModificado);

    await carritoService.modificarUnProductoCarrito(id,productoCarritoModificado);

    if (!productoCarrito) {
        CustomError.createError({
            name: "error al sumarle cantidad al carrito " , 
            message: "no existe producto con ese id",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }else{
    await carritoService.buscarUnProductoCarrito(id)
    res.send("el producto con el id : " + id + " fue agregado" )
    }

}

/*falta este
y con eso le meto un bucle para agregar esa cantidad , sino no me deja cambiar porque tiene un array adentro q me da un id unico en ese */
/*export const putModificarCantidad = async (req, res) => {
    let cantidadCambiada = req.body
    console.log(cantidadCambiada);
    console.log(req.params.id);
    let productoCarritpModificado = await carritoModelo.findOne({_id : req.params.id})//,{$set : cantidadCambiada})
    //console.log(cantidadCambiada);    
    console.log(productoCarritpModificado);
    res.send({status: "completado" , message: `se actualizo la compra con el id ${req.params.id}`, data : productoCarritpModificado})
}*/
//listo
export const deleteEliminarProducto = async (req, res) => {
    let id = req.params.id
    await carritoService.eliminarProducto (id)
    res.send({ status: "Success", message: " el producto con id " + req.params.id + " fue Eliminado del carrito " });
}
//listo
export const deleteEliminarcarito = async (req, res) => {
    await carritoService.eliminarTodoElCarrito()
    res.send({ status: "Success", message: " el carrito fue eliminado " });
}
// listo
export const handlebars = async (req, res) => {
    res.render ("realTimeProducts", {productoCarritoNombre} )
}

    







