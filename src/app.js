import express from "express"
import productosroutes from "./routes/productos.routes.js"
import carritoroutes from "./routes/carrito.routes.js"
import viewsroutes from "./routes/views.routes.js"
import sessionsRouter from "./routes/session.router.js"
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose'
import session from 'express-session' 
import MongoStore from "connect-mongo";

const conectarConMongo = `mongodb+srv://marianoapanelo:mariano5@cluster0.9gafxeg.mongodb.net/ecommers`
const app = express ()
const PORT = 8080


/*handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

/*donde esta el public */
app.use(express.static(__dirname + "/public"))

/*rutas */
app.use('/api/productos', productosroutes);
app.use('/api/carrito', carritoroutes);
app.use("/api", sessionsRouter);
app.use('/', viewsroutes); 




app.use(session({
    store : MongoStore.create({
        mongoUrl: conectarConMongo ,
        mongoOptions : { useNewUrlParser: true, useUnifiedTopology: true }, 
        ttl : 10 * 60
    }),
    secret:"coderSecret",
    resave:true, 
    saveUninitialized: true, 
}))

const abrirServer = app.listen(PORT, ()=>{
    console.log("server abierto");
    })

const conectMongoDB = async() =>{
    try {
        await mongoose.connect(conectarConMongo)
        console.log("conectado con mongo");
        


    } catch (error) {
        console.error("no se puede conectar con mongo" + error);
        process.exit()
    }
}

conectMongoDB()