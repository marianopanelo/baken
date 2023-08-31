import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const carrito = "carts"



const carritoEsquema = new mongoose.Schema({
    cantidad : Number,
    codigo : String ,
    idproducto : {
        type: [
            {
                producto: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "products"
                }
            }
        ],
        default: []
    }
});


/*carritoEsquema.pre('findOne', function () {
    this.populate("idProducto.producto");
});*/

carritoEsquema.plugin(mongoosePaginate)

export const carritoModelo = mongoose.model(carrito , carritoEsquema)
