import caritoManager from "../caritoManager.js"// cambiar a un manager
import { carritoModelo } from "../dao/models/carrito.models.js"
import { productosModelo } from "../dao/models/products.js"

const carito = new caritoManager ()

// listo
export const getVerCarrito = async(req,res) =>{
    let carritoTotal = await carritoModelo.find()
    return  res.send ( carritoTotal)
}

// listo 
export const postAgregarACarrito = async (req, res) => {
    let nuevoProducto = req.body
    if (!nuevoProducto.codigo){
        return res.status(400).send({status : "error" ,msj: "valores imncompletos cargar codigo del producto"})
    }

    await carritoModelo.insertMany(nuevoProducto)
    res.send("se agrego el producto con codigo " + nuevoProducto.codigo + " al carrito")
    /*populate */
    //console.log(nuevoProducto.codigo);
    let productoCarrito = await carritoModelo.findOne({codigo : nuevoProducto.codigo})
    console.log(productoCarrito);
    let productoAAgregar = await productosModelo.findOne({codigo : nuevoProducto.codigo})
    //console.log(productoAAgregar);
    productoCarrito.cantidad.push( {producto : productoAAgregar._id})
    console.log(productoCarrito);
    /*comparar donde estaba el error */
    await carritoModelo.updateOne({ codigo: nuevoProducto.codigo }, { $set: productoCarrito });
    console.log(resultado);
    let carritoYProducto = await carritoModelo.findOne({codigo : nuevoProducto.codigo}).populate(`cantidad.producto`)
    console.log(JSON.stringify(carritoYProducto, null, '\t'));
}


// ver este q no termina de salir, para sumar de a uno
export const postSumarCantidadCarrito = async (req, res) => {
    console.log(req.params.id);
    let productoCarrito = await carritoModelo.findOne({_id : req.params.id})
    console.log(productoCarrito);

    if (!productoCarrito) {
        return res.status(400).send({status : "error" ,msj: "no existe producto con ese id"})
    }else{
    await carito.agregarProductoCarrito(req.params.id)
    res.send("el producto con el id : " + req.params.id + " fue agregado" )
    }

}

/*para cambiar la cantidad del numero tendria q primero poder agregar uno, es el de arriba q me tira error 
y con eso le meto un bucle para agregar esa cantidad , sino no me deja cambiar porque tiene un array adentro q me da un id unico en ese */
export const putModificarCantidad = async (req, res) => {
    let cantidadCambiada = req.body
    console.log(cantidadCambiada);
    console.log(req.params.id);
    let productoCarritpModificado = await carritoModelo.findOne({_id : req.params.id}/*,{$set : cantidadCambiada}*/)
    //console.log(cantidadCambiada);    
    console.log(productoCarritpModificado);
    res.send({status: "completado" , message: `se actualizo la compra con el id ${req.params.id}`, data : productoCarritpModificado})
}
// listo
export const deleteEliminarProducto = async (req, res) => {
    await carritoModelo.deleteOne ( {_id : req.params.id} )
    res.send({ status: "Success", message: " el producto con id " + req.params.id + " fue Eliminado del carrito " });
}
// listo
export const deleteEliminarcarito = async (req, res) => {
    await carritoModelo.deleteMany()
    res.send({ status: "Success", message: " el carrito fue eliminado " });
}
// listo
export const handlebars = async (req, res) => {
    res.render ("realTimeProducts", {productoCarritoNombre} )
}

    







