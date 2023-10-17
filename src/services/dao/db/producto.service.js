import { productosModelo } from "../../../dao/models/products.js";


export default class productosServiceMongo {
    constructor() { 
        console.log("productos persistiendo en mongo");
    }

    verTodosLosProductos = async () => {
    let productosTotales = await productosModelo.find().sort({precio : 1})
    return  productosTotales
    }

    verProductos = async (cantidadTraida ) => {
        let product = await productosModelo.paginate({ categoria :  "juego" }, { limit: cantidadTraida, page: 1 }) /*en limit te va a traer primero las mas baratos  */
        return  product
    }

    buscarProductoPorId = async (id) => {
        console.log(id);
        let producto = await productosModelo.find({_id : id})
        if (!producto){
            return "no se encontro producto con ese id"
        }else{
        return producto
        }
    }

    agregarProductos = async (nuevoProducto) => {
        await productosModelo.insertMany(nuevoProducto)
        console.log(nuevoProducto);
    }

    modificarProducto = async (id , productoCambiado) => {
        let productoModificado = await productosModelo.updateOne({_id : id},{$set : productoCambiado})
        return productoModificado
    }

    BorrarProducto = async (id) => {
    await productosModelo.deleteOne ( {_id : id} )
    }

}
