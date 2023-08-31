import express from "express"
import productosroutes from "./routes/productos.routes.js"
import carritoroutes from "./routes/carrito.routes.js"
import __dirname from './utiles/utils.js';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import caritoManager from "./caritoManager.js"
import mongoose from 'mongoose'
import { carritoModelo } from "./dao/models/carrito.models.js";
import { mensajesModelo } from "./dao/models/mensajes.model.js";


const app = express ()
const PORT = 8080

/* me mostraba el carrito*/
const carito = new caritoManager ()
let productoCarritoNombre = await carito.tranformarCarritoJSON()

/*handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
/*donde esta el public */
app.use(express.static(__dirname + "/public"))
/*rutas */
app.use('/api/productos', productosroutes);
app.use('/api/carrito', carritoroutes);


const abrirServer = app.listen(PORT, ()=>{
console.log("server abierto");
})


/*envio el carrito desde socket, pero lo puedo enviar por log , no se como enviarlo por pantalla o parametro hasta la clase del miercoles 31/JUL */
const socketServer = new Server (abrirServer)

socketServer.on("connection" , socket =>{
    console.log("cliente conectado");

    socketServer.emit("evento_para_todos", productoCarritoNombre)
})

const conectMongoDB = async() =>{
    try {
        await mongoose.connect(`mongodb+srv://marianoapanelo:mariano5@cluster0.9gafxeg.mongodb.net/ecommers`)
        console.log("conectado con mongo");
        



        
        

    } catch (error) {
        console.error("no se puede conectar con mongo" + error);
        process.exit()
    }
}

conectMongoDB()