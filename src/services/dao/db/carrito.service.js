import { carritoModelo } from "../../../dao/models/carrito.models.js";
import { productosModelo } from "../../../dao/models/products.js";
import { productosService } from "../../factory.js";


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

    verTiket = async () =>{
        let carritoTotal = await carritoModelo.find()
        console.log("los productos comprados son " + carritoTotal.length + " y cada producto tiene esta cantidad");
        let cantidadTotal = 0
        let precioTotal = 0
        for (let i = 0 ; i < carritoTotal.length  ; i++){
            let cantidadInicial = cantidadTotal 
            let precioInicial = precioTotal
            let idProducto = carritoTotal[i].cantidad[0].producto
            //console.log(idProducto);
            let pruductos = await productosService.buscarProductoPorId(idProducto)
            //console.log(pruductos);
            let precioTotalDelArray = (pruductos[0].precio * carritoTotal[i].cantidad.length)
            console.log("precio de un jeugo " + pruductos[0].precio);
            console.log("precio de los mismos juegos " +  precioTotalDelArray);
            console.log("producto = " + pruductos[0].title + " la cantidad comprada es " + carritoTotal[i].cantidad.length + " el precio total es " + precioTotalDelArray);
            cantidadTotal = cantidadInicial + carritoTotal[i].cantidad.length
            precioTotal = precioInicial + precioTotalDelArray
            console.log("el total a pagar es :" + precioTotal);
            console.log("la cantidad total es: " + cantidadTotal);
            console.log("nombre de los juegos : " + pruductos[0].title);
        }
        return carritoTotal
    }
     

}

//productosService
//buscarProductoPorId