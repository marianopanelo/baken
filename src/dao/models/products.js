import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"


const products = "products";

const productosEsquema = new mongoose.Schema({
    title: String,
    descripcion: String,
    precio: Number,
    imagen: String,
    codigo: String,
    stock: Number,
    categoria: String
})

productosEsquema.plugin(mongoosePaginate)
export const productosModelo = mongoose.model(products , productosEsquema)