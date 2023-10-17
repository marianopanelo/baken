import { carritoModelo } from "../../../dao/models/carrito.models.js";
import { productosModelo } from "../../../dao/models/products.js";


export default class carritoServiceMongo {
    constructor() { 
        console.log("carrito persistiendo en mongodb");
    }

    vertodos = async () => {
        let carritoTotal = await carritoModelo.find()
        return carritoTotal
    }

    agregarAlCarrito = async (nuevoProducto) => {
        await carritoModelo.insertMany(nuevoProducto)
    }

    agregarAlCarritoPopulate = async (nuevoProducto) => {
    console.log(nuevoProducto.codigo);
    let productoCarrito = await carritoModelo.findOne({codigo : nuevoProducto.codigo})
    console.log(productoCarrito);
    let productoAAgregar = await productosModelo.findOne({codigo : nuevoProducto.codigo})
    console.log(productoAAgregar);
    productoCarrito.cantidad.push( {producto : productoAAgregar._id})
    console.log(productoCarrito);
    /*comparar donde estaba el error */
    await carritoModelo.updateOne({ codigo: nuevoProducto.codigo }, { $set: productoCarrito });
    let carritoYProducto = await carritoModelo.findOneAndUpdate({codigo : nuevoProducto.codigo}).populate(`cantidad.producto`)
    console.log(JSON.stringify(carritoYProducto, null, '\t'));
    return carritoYProducto
    }

    buscarUnProductoCarrito = async (id) => {
        let productoCarrito = await carritoModelo.findOne({_id : id})
        return productoCarrito
    }

    modificarUnProductoCarrito = async (id, productoCarritoModificado) => {
        await carritoModelo.updateOne( {_id : id}, { $set: productoCarritoModificado });
    }

    eliminarProducto = async (id) => {
        await carritoModelo.deleteOne ( {_id : id} )
    }

    eliminarTodoElCarrito = async () => {
        await carritoModelo.deleteMany()
    }

}
